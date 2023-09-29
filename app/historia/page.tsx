import { getPageBySlug } from "../lib/api"

export default async function Historia() {
    const data = await getPageBySlug("historia")
    console.log('data', data)
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <h1 className="text-4xl">{data.title}</h1>
            <div
                className="text-lg leading-relaxed mb-4 text-justify"
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </main>
    )
}