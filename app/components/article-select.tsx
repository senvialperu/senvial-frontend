import React from "react";
import Link from "next/link";

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline bg-primary text-primary-content"
    : "px-3 py-1 rounded-lg hover:underline bg-secondary text-primary-content";
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: any
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {
  categories = categories.categories.nodes
  return (
    <div className="p-4 rounded-lg bg-secondary-content min-h-[365px] relative text-white">
      <h4 className="text-xl font-semibold">Buscar por categoria</h4>
      <div>
        <div className="flex flex-wrap gap-2 py-6">
          {categories.map((category: any, index: number) => {
            console.log('current and selected', category.slug, params.category)
            if (categories === 0) return null;
            return (
              <Link
                href={`/blog/${category.slug}`}
                key={index}
                className={selectedFilter(
                  category.slug,
                  params.category
                )}
              >
                #{category.name}
              </Link>
            );
          })}
          <Link href={"/blog"} className={selectedFilter("", "filter")}>
            #todo
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Otros post que podrían gustarle</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: any, index: number) => {
              let slug = article.node.categories?.edges?.[0]?.node?.posts?.nodes[index]?.slug;
              let title = article.node.categories?.edges?.[0]?.node?.posts?.nodes[index]?.title;
              index++;
              if (slug && title) {
                return (
                  <li key={index}>
                    <Link
                      rel="noopener noreferrer"
                      href={`/blog/${params.category}/${slug}`}
                      className={`${params.slug === slug &&
                        "text-primary"
                        }  hover:underline hover:text-primary-focus transition-colors duration-200`}
                    >
                      {title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
