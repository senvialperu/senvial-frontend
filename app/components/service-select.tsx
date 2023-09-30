import React from "react";
import Link from "next/link";

function selectedFilter(current: string, selected: string) {
    return current === selected
        ? "px-3 py-1 rounded-lg hover:underline bg-primary text-primary-content"
        : "px-3 py-1 rounded-lg hover:underline bg-secondary text-primary-content";
}

export default function ServiceSelect({
    services,
    categories,
    params,
}: {
    services: any;
    categories: any;
    params: {
        slug: string;
        category: string;
    };
}) {
    services = services.services.nodes
    return (
        <div className="p-4 rounded-lg bg-secondary-content min-h-[365px] relative text-white">
            <div>
                <div className="flex flex-wrap gap-2 text-white ">
                    {categories.map((category: any, index: number) => {
                        if (category === 0) return null;
                        return (
                            <Link
                                key={index}
                                href={`/servicios/${category.slug}`}
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
                    <h4 className="text-lg font-semibold">Otros servicios</h4>
                    <ul className="ml-4 space-y-1 list-disc">
                        {services.map((service: any, index: number) => {
                            console.log('service', service.serviceCategories.nodes[0])
                            return (
                                <li key={index}>
                                    <Link
                                        rel="noopener noreferrer"
                                        href={`/servicios/${params.category}/${service.slug}`}
                                        className={`${params.slug === service.slug &&
                                            "text-primary"
                                            }  hover:underline hover:text-primary-focus transition-colors duration-200`}
                                    >
                                        {service.title}
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
