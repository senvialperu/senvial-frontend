import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils/helpers";

export default function PostList({
    data: articles,
    children,
}: {
    data: any;
    children?: React.ReactNode;
}) {

    console.log('articles', articles)

    const category = articles[0].categories.nodes[0].slug
    return (
        <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article: any) => {
                    const imageUrl = article.featuredImage?.node?.mediaItemUrl
                    return (
                        <Link
                            href={`/blog/${category}/${articles[0].slug}`}
                            key={article.id}
                            className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-primary-content lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg text-white"
                        >
                            {imageUrl && (
                                <Image
                                    alt="presentation"
                                    width="240"
                                    height="240"
                                    className="object-cover w-full h-44 "
                                    src={imageUrl}
                                />
                            )}
                            <div className="p-6 space-y-2 relative">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline text-white">
                                    {article.title}
                                </h3>
                                <div
                                    className="text-lg leading-relaxed mb-4"
                                    dangerouslySetInnerHTML={{ __html: article.excerpt }}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
            {children && children}
        </section>
    );
}
