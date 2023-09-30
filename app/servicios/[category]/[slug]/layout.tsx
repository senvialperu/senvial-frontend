import React from "react";
import { getServices, getServicesCategories } from "@/app/lib/api";

import ServiceSelect from "@/app/components/service-select";

async function fetchSideMenuData() {
    try {
        const servicesData = await getServices();
        return {
            services: servicesData
        };
    } catch (error) {
        console.error(error);
    }
}


interface Service {
    title: string;
    slug: string;
    content: string;
    description: string;
    picture: {
        altText: string;
        sourceUrl: string;
    };
}

interface Data {
    services: Service[];
}

export default async function LayoutRoute({
    params,
    children,
}: {
    children: React.ReactNode;
    params: {
        service: string;
        slug: string;
        category: string;
    };
}) {
    const { services } = (await fetchSideMenuData()) as Data;
    const categories = await getServicesCategories();

    return (
        <section className="container p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
                <div className="col-span-2">{children}</div>
                <aside>
                    <ServiceSelect
                        services={services}
                        categories={categories.serviceCategories.nodes}
                        params={params}
                    />
                </aside>
            </div>
        </section>
    );
}