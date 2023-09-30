import Service from "@/app/views/service";
import { getServiceBySlug } from "@/app/lib/api";

export default async function PostRoute({ params }: { params: { slug: string, category: string } }) {
    const service = await getServiceBySlug(params.slug);
    return (
        <main className='flex min-h-screen flex-col justify-between'>
            <article>
                <Service data={service} category={params.category} />
            </article>
        </main>
    )
}