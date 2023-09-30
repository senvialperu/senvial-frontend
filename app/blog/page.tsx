import { getAllPostsForHome } from '../lib/api'

import Container from '../components/container'
import Intro from '../components/intro'
import HeroPost from '../components/hero-post'
import MoreStories from '../components/more-stories'
import { GetStaticProps } from 'next'

export default async function Blog() {
  const allPosts = await getAllPostsForHome(false)

  const heroPost = allPosts.edges[0]?.node
  const morePosts = allPosts.edges.slice(1)

  return (
    <Container>
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.featuredImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          category={heroPost.categories.nodes[0]}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  )
}
