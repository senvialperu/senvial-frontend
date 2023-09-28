import Image from 'next/image';


export default function Product({ data }: { data: any }) {
    console.log('data product', data)
    const { title, description, picture } = data[0].node;
    console.log('picture', picture)

    return (
        <article className="space-y-8">
            {picture.souceUrl && (
                <Image
                    src={picture.souceUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg"
                />
            )}
            <div className="space-y-6">
                <h1 className="leading-tight text-5xl font-bold text-primary-content">{title}</h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                </div>
            </div>

            <div className="text-primary-content">
                <p>{description}</p>
            </div>
        </article>
    );
}
