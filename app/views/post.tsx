import Image from 'next/image';
import cheerio from 'cheerio';

export default function Post({ data }: any) {
    const { title, slug, content, featuredImage, categories, excerpt } = data[0];


    const imageUrl = data.featuredImage?.node?.mediaItemUrl

    function justifyParagraphs(content) {
        const $ = cheerio.load(content);

        $('p').each((index, element) => {
            $(element).attr('style', 'text-align: justify;');
        });
        $('h1').each((index, element) => {
            $(element).attr('style', 'margin-top: 2rem; margin-bottom: 1rem; font-size: 2rem; font-weight: 700; line-height: 1.2; text-align: center;');
        });
        $('h2').each((index, element) => {
            $(element).attr('style', 'margin-top: 2rem; margin-bottom: 1rem; font-size: 1.5rem; line-height: 1.2; text-align: left;');
        });

        return $.html();
    }

    const justifiedContent = justifyParagraphs(content);

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
            <div className="space-y-6 max-w-3xl">
                <h1 className="leading-tight text-5xl font-bold text-primary-content">{title}</h1>
                <div className=''>
                    <div
                        className="text-lg leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: justifiedContent }}
                    />
                </div>
            </div>
        </article>
    );
}
