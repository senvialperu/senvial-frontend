import { getPostsByCategory, getAllPostsWithSlug, getAllPostsForHome } from "@/app/lib/api";
import PostList from "@/app/views/blog-list";
import SortedPosts from "@/app/components/sorted-posts";


export default async function PostsByCategory({ params }: { params: { category: string } }) {
    const postsResponse = await getPostsByCategory(params.category);
    let sortedPosts: any;
    postsResponse.map((post: any) => {
        post.node.categories.edges.map((edge: any) => {
            sortedPosts = edge.node.posts.nodes
        });
    });
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <strong><h1 className="text-4xl">Nuestro blog</h1></strong>
            <PostList data={sortedPosts} />
        </main>
    )
}