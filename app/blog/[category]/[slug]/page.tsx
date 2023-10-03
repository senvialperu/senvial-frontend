import { getAllPostsForHome, getPostBySlug } from '@/app/lib/api'
import Post from '@/app/views/post';
import ScrollTopBar from '@/app/components/scroll-top-bar';

export default async function PostRoute({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    return (
        <article>
            <ScrollTopBar >
                <Post data={post} />
            </ScrollTopBar>
        </article>
    )
}