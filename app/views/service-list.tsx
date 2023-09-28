import Image from "next/image";
import Link from "next/link";

export default function ServiceList({
    data: services,
    children,
}: {
    data: any;
    children?: React.ReactNode;
}) {
    services = services.services;
    console.log('services', services)

    return (
        <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-white">
                {services.nodes.map((service: any) => {
                    console.log('service1', service)
                    const imageUrl = service?.picture?.sourceUrl
                    return (
                        <Link
                            href={`/servicios/${service.slug}`}
                            key={service.id}
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
                                    {service.title}
                                </h3>
                                <p className="py-4">{service.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {children && children}
        </section>
    );
}