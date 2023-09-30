import { getPageBySlug } from "../lib/api"
import cheerio from 'cheerio';
import Image from 'next/image';


export default async function Historia() {
    const data = await getPageBySlug("historia");
    const content = data.content;

    const featuredImage = data.featuredImage?.node

    function justifyParagraphs(content) {
        const $ = cheerio.load(content);

        $('p').each((index, element) => {
            $(element).attr('style', 'text-align: justify;');
        });
        $('h1').each((index, element) => {
            $(element).attr('style', 'margin-top: 2rem; margin-bottom: 1rem; font-size: 2rem; font-weight: 700; line-height: 1.2; text-align: center;');
        });
        $('h2').each((index, element) => {
            $(element).attr('style', 'margin-top: 2rem; margin-bottom: 1rem; font-size: 1.5rem; line-height: 1.2; text-align: justify;');
        });
        return $.html();
    }

    const justifiedContent = justifyParagraphs(content);

    return (
        <main className="flex min-h-screen flex-col mx-auto space-y-6 sm:space-y-12 lg:mt-16 text-center">
            <Image src={featuredImage.sourceUrl} alt={featuredImage.alt} width={1920} height={400} />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl">{data.title}</h1>
                <div className="text-lg leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: justifiedContent }} />
            </div>
        </main>
    );
}
