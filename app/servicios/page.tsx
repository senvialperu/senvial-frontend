import { getServices } from "../lib/api";
import Service from "@/app/views/service-list"

export default async function Products() {
    const serviceData = await getServices();
    console.log('serviceData', serviceData)
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <strong><h1 className="text-4xl">Servicios</h1></strong>
            <Service data={serviceData} />
        </main>
    );
}