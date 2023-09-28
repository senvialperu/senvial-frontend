import Product from "@/app/views/product";
import { getProductBySlug } from "@/app/lib/api";

export default async function PostRoute({ params }: { params: { slug: string } }) {
    const product = await getProductBySlug(params.slug);
    return (
        <main className='flex min-h-screen flex-col justify-between'>
            <article>
                <Product data={product} />
            </article>
        </main>
    )
}