import Image from 'next/image';
import { formatDate } from '@/app/utils/helpers';

export default function Post({ data }: any) {
    console.log('Post', data)
    const { title, slug, content, featuredImage, categories, excerpt } = data[0];


    const imageUrl = data.featuredImage?.node?.mediaItemUrl

    return (
        <article className="space-y-8">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg"
                />
            )}
            <div className="space-y-6">
                <h1 className="leading-tight text-5xl font-bold text-primary-content">{title}</h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                    <div className="flex items-center md:space-x-2">
                        <div
                            className="text-lg leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                    </div>
                </div>
                <div>
                    <div
                        className="text-lg leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </article>
    );
}
