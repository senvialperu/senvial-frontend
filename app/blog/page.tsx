import { getAllPostsForHome } from '../lib/api'

import Container from '../components/container'
import Intro from '../components/intro'
import HeroPost from '../components/hero-post'
import MoreStories from '../components/more-stories'
import { GetStaticProps } from 'next'

export default async function Blog() {
  const allPosts = await getAllPostsForHome(false)


  const morePosts = allPosts.edges

  return (
    <Container>
      <Intro />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  )
}
