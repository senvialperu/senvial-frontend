import Image from "next/image";
import Link from "next/link";

export default function ProductList({
    data: products,
    children,
}: {
    data: any[];
    children?: React.ReactNode;
}) {
    const category = products[0].node.productCategory.node
    const imageUrl = products[0].node.picture

    return (
        <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-white">
                {products.map((product) => {
                    const imageUrl = product.node.picture.sourceUrl
                    return (
                        <Link
                            href={`/productos/${category?.slug}/${product.node.slug}`}
                            key={product.id}
                            className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-primary-content lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
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

                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                                    {product.node.title}
                                </h3>
                                <p className="py-4">{product.node.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {children && children}
        </section>
    );
}
