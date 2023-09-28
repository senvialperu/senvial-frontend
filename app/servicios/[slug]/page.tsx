import Service from "@/app/views/service";
import { getServiceBySlug } from "@/app/lib/api";

export default async function PostRoute({ params }: { params: { slug: string } }) {
    const service = await getServiceBySlug(params.slug);
    console.log('servisioooo', service)
    return (
        <main className='flex min-h-screen flex-col justify-between'>
            <article>
                <Service data={service} />
            </article>
        </main>
    )
}