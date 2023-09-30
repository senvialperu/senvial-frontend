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
            categories {
              nodes {
                slug
                name
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
  query products {
    products {
      nodes {
        slug
        title
        productCategory {
          node {
            title
            slug
          }
        }
        description
        content
        picture {
          altText
          sourceUrl
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
            order
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
            serviceCategories {
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
        contactLinks {
          nodes {
            newTab
            contactType
            text
            url
          }
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
        slides {
          nodes {
            image {
              altText
              sourceUrl
            }
            text
          }
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
        title
        description
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

export async function getPostBySlug(slug: string){
  const data = await fetchAPI(`
  query posts {
    posts {
      nodes {
        title
        slug
        content
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
          }
        }
        excerpt
      }
    }
  }
  `)
  let dataSorted: any = [];
  data.posts.nodes.forEach((post: any) => {
    if(post.slug === slug){
      dataSorted.push(post)
    }
  });
  return dataSorted
}

export async function getPostsByCategory(category: string) {
  // Decodifica la categoría antes de usarla
  const decodedCategory = decodeURIComponent(category);

  const data = await fetchAPI(`
  query posts {
    posts {
      edges {
        node {
          id
          categories(where: {slug:"${decodedCategory}"}) {
            edges {
              node {
                id
                posts {
                  nodes {
                    title
                    content
                    featuredImage {
                      node {
                        mediaItemUrl
                        sourceUrl
                      }
                    }
                    categories {
                      nodes {
                        name
                        slug
                      }
                    }
                    author {
                      node {
                        firstName
                        avatar {
                          url
                        }
                      }
                    }
                    slug
                    excerpt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `, {
    variables: {
      decodedCategory,
    },
  });

  return data.posts.edges;
}

export async function getBlogCategories(){
  const data = await fetchAPI(`
  query categories {
    categories {
      nodes {
        slug
        name
      }
    }
  }
  `)
  return data
}

export async function getIconTextDivs(){
  const data = await fetchAPI(`
  query iconTextDivs {
    iconTextDivs {
      nodes {
        text
        icon
      }
    }
  }
  `)
  return data
}

export async function getClients(){
  const data = await fetchAPI(`
  query iconTextDivs {
    clientes {
      nodes {
        title
        picture {
          sourceUrl
        }
      }
    }
  }
  `)
  return data
}

export async function getProductsByCategory(category: string){
  let sortedProducts: any = [];
  const data = await fetchAPI(`
  query postByCategory {
    products {
      edges {
        node {
          description
          title
          slug
          picture {
            altText
            sourceUrl
          }
          content
          productCategory {
            node {
              title
              slug
            }
          }
        }
      }
    }
  }
  `)
  if (category === 'all'){
    return data.products.edges
  }else{
    data.products.edges.map((product: any) => {
      if(product.node.productCategory.node.slug === category){
        sortedProducts.push(product)
      }
    })
  }
  return sortedProducts
}

export async function getProductBySlug(slug: string){
  const data = await fetchAPI(`
  query postByCategory {
  products {
    edges {
      node {
        description
        title
        slug
        picture {
          altText
          sourceUrl
        }
        content
        productCategory {
          node {
            title
            slug
          }
        }
        contentContainer {
          nodes {
            images {
              altText
              sourceUrl
              id
            }
            text
          }
        }
      }
    }
  }
}
  `)
  let dataSorted: any = [];
  data.products.edges.forEach((product: any) => {
    if(product.node.slug === slug){
      dataSorted.push(product)
    }
  });
  return dataSorted
}

export async function getProductCategories(){
  const data = await fetchAPI(`
  query productCategories {
    productCategories {
      nodes {
        slug
        title
      }
    }
  }
  `)
  return data
}

export async function getServicesCategories(){
  const data = await fetchAPI(`
  query servicesCategories {
    serviceCategories {
      nodes {
        slug
        title
      }
    }
  }
  `)
  return data
}

export async function getServices(){
  const data = await fetchAPI(`
  query services {
    services {
      nodes {
        picture {
          altText
          sourceUrl
        }
        slug
        title
        content
        id
        description
        serviceCategories {
          nodes {
            slug
          }
        }
      }
    }
  }
  `)
  return data

}

export async function getServiceBySlug(slug: string){
  const data = await fetchAPI(`
  query services {
    services {
      nodes {
        picture {
          altText
          sourceUrl
        }
        slug
        title
        content
        id
        description
        contentContainer {
          nodes {
            images {
              id
              altText
              sourceUrl
            }
            text
          }
        }
      }
    }
  }
  `)

  const service = data.services.nodes.find((service: any) => service.slug === slug);
  return service;
}

export async function getServiceByCategory(category: string){
  let sortedServices: any = [];
  const data = await fetchAPI(`
  query services {
    services {
      nodes {
        picture {
          altText
          sourceUrl
        }
        slug
        title
        content
        id
        description
        serviceCategories {
          nodes {
            slug
          }
        }
      }
    }
  }
  `)
  if (category === 'all'){
    return data.services.nodes
  }else{
    data.services.nodes.map((service: any) => {
      if(service.serviceCategories.nodes[0].slug === category){
        sortedServices.push(service)
      }
    })
  }
  return sortedServices
}

export async function getPageBySlug(slug: string){
  const data = await fetchAPI(`
  query historiaPage {
    pages {
      nodes {
        content
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
  `)
  const page = data.pages.nodes.find((page: any) => page.slug === slug);
  return page
}

export async function getLogo(){
  const data = fetchAPI(`
  query image {
    mediaItems(first: 100, where: {title: "favicon"}) {
      nodes {
        altText
        sourceUrl
        id
        slug
        title
      }
    }
  }
  `)
  return data
}