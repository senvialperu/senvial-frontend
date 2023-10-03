import { getServiceByCategory } from "@/app/lib/api";
import ServiceList from "@/app/views/service-list";

export default async function PostsByCategory({ params }: { params: { category: string } }) {
    const postsResponse = await getServiceByCategory(params.category);
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <h1 className="text-4xl font-bold">Servicios</h1>
            <ServiceList data={postsResponse} />
        </main>
    )
}