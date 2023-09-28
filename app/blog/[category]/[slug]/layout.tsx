import React from "react";

import ArticleSelect from "@/app/components/article-select";
import { getBlogCategories, getPostsByCategory } from "@/app/lib/api";
import { get } from "http";

async function fetchSideMenuData(filter: string) {
    try {
        const categoriesResponse = await getBlogCategories();
        const articlesResponse = await getPostsByCategory(filter);

        return {
            categories: categoriesResponse,
            articles: articlesResponse
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

interface Article {
    id: number;
    attributes: {
        title: string;
        slug: string;
    };
}

interface Data {
    articles: Article[];
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
    const { categories, articles } = (await fetchSideMenuData(category)) as Data;

    return (
        <section className="container p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
                <div className="col-span-2">{children}</div>
                <aside>
                    <ArticleSelect
                        categories={categories}
                        articles={articles}
                        params={params}
                    />
                </aside>
            </div>
        </section>
    );
}