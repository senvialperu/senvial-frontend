import { getProductsByCategory } from "@/app/lib/api";
import ProductList from "@/app/views/product-list";

export default async function PostsByCategory({ params }: { params: { category: string } }) {
    const postsResponse = await getProductsByCategory(params.category);
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <strong><h1 className="text-4xl">Productos</h1></strong>
            <ProductList data={postsResponse} />
        </main>
    )
}