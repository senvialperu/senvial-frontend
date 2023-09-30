import { getPageBySlug } from "../lib/api"
import cheerio from 'cheerio';


export default async function Historia() {
    const data = await getPageBySlug("historia");
    const content = data.content;

    function justifyParagraphs(content) {
        const $ = cheerio.load(content);

        $('p').each((index, element) => {
            $(element).attr('style', 'text-align: justify;');
        });
        $('h1').each((index, element) => {
            $(element).attr('style', 'margin-top: 2rem; margin-bottom: 1rem; font-size: 2rem; font-weight: 700; line-height: 1.2; text-align: center;');
        });

        return $.html();
    }

    const justifiedContent = justifyParagraphs(content);

    return (
        <main className="flex min-h-screen flex-col p-8 mx-auto space-y-6 sm:space-y-12 lg:mt-16 text-center">
            <div className="max-w-lg mx-auto">
                <h1 className="text-4xl">{data.title}</h1>
                <div className="text-lg leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: justifiedContent }} />
            </div>
        </main>
    );
}
