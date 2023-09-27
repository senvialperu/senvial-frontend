const API_URL = process.env.WORDPRESS_API_URL || '';

type Headers = {
  'Content-Type': string;
  Authorization?: string;
}


async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers: Headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL || '', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API json line 25')
  }
  return json.data
}

export async function getPreviewPost(id:any, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview: any) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug: any, preview: any, previewData: { post: any }) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }: any) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}

export async function getAllProducts(){
  const data = await fetchAPI(`
    query AllProducts {
      products(first: 10000) {
        edges {
          node {
            id
            name
            slug
            description
            image {
              sourceUrl
            }
            productCategories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `)
  return data?.products
}

export async function getNavbar(){
  const data = await fetchAPI(`
  query Navbar {
    navbars(first: 1) {
      nodes {
        links {
          nodes {
            newTab
            text
            url
          }
        }
        navbarLogo {
          id
          mediaDetails {
            height
            width
          }
          mediaItemUrl
        }
        socialLinks {
          nodes {
            title
            url
            social
            socialLinkId
          }
        }
        whatsapp
        location
        buttons {
          nodes {
            url
            type
            text
          }
        }
        acordeonLinks {
          nodes {
            productCategories {
              nodes {
                name
                slug
              }
            }
            services {
              nodes {
                slug
                title
              }
            }
          }
        }
      }
    }
  }
  
  `)
  return data
}

export async function getFooter(){
  const data = await fetchAPI(`
  {
    footers {
      nodes {
        links {
          nodes {
            url
            text
            newTab
          }
        }
        menuLinks {
          nodes {
            newTab
            url
            text
          }
        }
        location
        routeLinks {
          nodes {
            id
            url
            text
            newTab
          }
          nodes {
            url
            text
            id
            newTab
          }
        }
        socialLInks {
          nodes {
            social
            url
            text
            newTab
          }
        }
        footerLogo {
          mediaItemUrl
        }
      }
    }
  }`)
  return data
}

export async function getGlobal(){
  const navbar = await getNavbar()
  const footer = await getFooter()
  return {navbar, footer}

}

export async function getHero(){
  const data = await fetchAPI(`
  query heros {
    heros {
      nodes {
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
        content
        buttons {
          nodes {
            text
            type
            url
          }
        }
      }
    }
  }
  `)
  return data
}

export async function getSlider(){
  const data = await fetchAPI(`
  query sliders {
    sliders {
      nodes {
        picture {
          mediaItemUrl
          sizes
          altText
        }
      }
    }
  }
  `)
  return data
}

export async function getRadials(){
  const data = await fetchAPI(`
  query radials {
    radialProgresses {
      nodes {
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        radials {
          nodes {
            title
            percent
            description
          }
        }
      }
    }
  }
  `)
  return data
}