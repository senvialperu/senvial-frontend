import React from "react";
import Link from "next/link";

function selectedFilter(current: string, selected: string) {
    return current === selected
        ? "px-3 py-1 rounded-lg hover:underline bg-primary text-primary-content"
        : "px-3 py-1 rounded-lg hover:underline bg-secondary text-primary-content";
}

export default function ServiceSelect({
    services,
    params,
}: {
    services: any;
    params: {
        slug: string;
    };
}) {
    services = services.services.nodes
    console.log('services', services)
    return (
        <div className="p-4 rounded-lg bg-secondary-content min-h-[365px] relative text-white">
            <div>
                <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Otros servicios</h4>
                    <ul className="ml-4 space-y-1 list-disc">
                        {services.map((service: any, index: number) => {
                            return (
                                <li key={index}>
                                    <Link
                                        rel="noopener noreferrer"
                                        href={`/servicios/${service.slug}`}
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
