import React from "react";
import Link from "next/link";

function selectedFilter(current: string, selected: string) {
    return current === selected
        ? "px-3 py-1 rounded-lg hover:underline bg-primary text-primary-content"
        : "px-3 py-1 rounded-lg hover:underline bg-secondary text-primary-content";
}

export default function ProductSelect({
    categories,
    products,
    params,
}: {
    categories: any;
    products: any;
    params: {
        slug: string;
        category: string;
    };
}) {
    categories = categories.productCategories.nodes
    console.log('categories ps', categories)

    return (
        <div className="p-4 rounded-lg bg-secondary-content min-h-[365px] relative text-white">
            <h4 className="text-xl font-semibold">Buscar por categoria</h4>

            <div>
                <div className="flex flex-wrap py-6 space-x-2 text-white">
                    {categories.map((category: any, index: number) => {
                        console.log('current and selected', category, params.category)
                        if (category === 0) return null;
                        return (
                            <Link
                                key={index}
                                href={`/productos/${category.slug}`}
                                className={selectedFilter(
                                    category.slug,
                                    params.category
                                )}
                            >
                                #{category.title}
                            </Link>
                        );
                    })}
                    <Link href={"/productos"} className={selectedFilter("", "filter")}>
                        #todo
                    </Link>
                </div>


                <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Otros productos</h4>
                    <ul className="ml-4 space-y-1 list-disc">
                        {products.map((product: any, index: number) => {
                            return (
                                <li key={index}>
                                    <Link
                                        rel="noopener noreferrer"
                                        href={`/productos/${params.category}/${product.node.slug}`}
                                        className={`${params.slug === product.node.slug &&
                                            "text-primary"
                                            }  hover:underline hover:text-primary-focus transition-colors duration-200`}
                                    >
                                        {product.node.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
