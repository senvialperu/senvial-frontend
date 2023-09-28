import { getProductsByCategory } from "../lib/api";
import Product from "../views/product-list";

export default async function Products() {
    const productsData = await getProductsByCategory("all");
    console.log('productsData', productsData)
    return (
        <main className="flex min-h-screen flex-col items-center p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16">
            <strong><h1 className="text-4xl">Productos</h1></strong>
            <Product data={productsData} />
        </main>
    );
}
