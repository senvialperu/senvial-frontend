import React from "react";
import { getProductCategories, getProductsByCategory } from "@/app/lib/api";
import ProductSelect from "@/app/components/product-select";

async function fetchSideMenuData(filter: string) {
    try {
        const categoriesResponse = await getProductCategories();
        const productsResponse = await getProductsByCategory(filter);

        return {
            categories: categoriesResponse,
            products: productsResponse
        };
    } catch (error) {
        console.error(error);
    }
}

interface Category {
    id: number;
    attributes: {
        name: string;
        slug: string;
        articles: {
            data: Array<{}>;
        };
    };
}

interface Product {
    id: number;
    attributes: {
        name: string;
        slug: string;
    };
}
interface Product {
    title: string;
    slug: string;
    productCategory: {
        node: {
            title: string;
            slug: string;
        };
    };
    content: string;
    description: string;
    picture: {
        sourceUrl: string;
    };
}
interface Data {
    products: Product[];
    categories: Category[];
}

export default async function LayoutRoute({
    params,
    children,
}: {
    children: React.ReactNode;
    params: {
        slug: string;
        category: string;
    };
}) {
    const { category } = params;
    const { categories, products } = (await fetchSideMenuData(category)) as Data;

    return (
        <section className="container p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
                <div className="col-span-2">{children}</div>
                <aside>
                    <ProductSelect
                        categories={categories}
                        products={products}
                        params={params}
                    />
                </aside>
            </div>
        </section>
    );
}