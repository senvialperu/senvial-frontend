import { getAllPostsForHome, getPostBySlug } from '@/app/lib/api'
import Container from '@/app/components/container';
import Header from '@/app/components/header';
import PostTitle from '@/app/components/post-title';
import PostHeader from '@/app/components/post-header';
import PostBody from '@/app/components/post-body';
import SectionSeparator from '@/app/components/section-separator';
import MoreStories from '@/app/components/more-stories';
import Tags from '@/app/components/tags';
import ErrorPage from 'next/error';
import Post from '@/app/views/post';

export default async function PostRoute({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    return (
        <main className='flex min-h-screen flex-col justify-between'>
            <article>
                <Post data={post} />
            </article>
        </main>
    )
}