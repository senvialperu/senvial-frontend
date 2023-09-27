import { getAllPostsWithSlug, getPostsBySlug } from '../../lib/api'
import Container from '@/app/components/container';
import Header from '@/app/components/header';
import PostTitle from '@/app/components/post-title';
import PostHeader from '@/app/components/post-header';
import PostBody from '@/app/components/post-body';
import SectionSeparator from '@/app/components/section-separator';
import MoreStories from '@/app/components/more-stories';
import Tags from '@/app/components/tags';
import ErrorPage from 'next/error';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getPostWithSlug = async (slug: string) => {
    const allPosts = await getPostsBySlug(slug);

    return {
        paths: allPosts.edges.map(({ node }: any) => `/blog/category/${node.slug}`) || [],
        fallback: true,
    }
}

export default async function Post({ params }: { params: { slug: string } }) {
    const post = await getPostsBySlug(params.slug);
    console.log('post', post)
    return (
        <article>
            <title>
                {`${post.title}`}
            </title>
            <meta
                property="og:image"
                content={post.featuredImage?.node.sourceUrl}
            />
            <PostHeader
                title="hello"
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
            />
            <PostBody content={post.content} />

        </article>

    )
}