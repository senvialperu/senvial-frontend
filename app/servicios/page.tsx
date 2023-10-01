import { getServiceByCategory, getServices } from "../lib/api";
import Services from "@/app/views/service-list"

export default async function Products() {
    const serviceData = await getServiceByCategory("all");
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <strong><h1 className="text-4xl">Servicios</h1></strong>
            <Services data={serviceData} />
        </main>
    );
}
