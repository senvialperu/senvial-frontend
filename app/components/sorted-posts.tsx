import PostPreview from './post-preview'

export default function SortedPosts({ posts }: any) {
    console.log("posts sorted posts", posts)
    posts.map((post: any) => {
        console.log('post', post)
    })
    return (
        <section>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                Más posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {posts.map((node: any) => {
                    console.log('node', node)
                    return (
                        <PostPreview
                            key={node?.slug}
                            title={node?.title}
                            coverImage={node?.featuredImage}
                            date={node?.date}
                            author={node?.author}
                            slug={node?.slug}
                            excerpt={node?.excerpt}
                        />
                    )
                })}
            </div>
        </section>
    )
}