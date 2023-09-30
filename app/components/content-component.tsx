import ImageGallery from "./images-container";
import cheerio from 'cheerio';

const ContentContainer = (dataContainer: any) => {
    const images = dataContainer;
    const content = dataContainer.data.text


    const justifiedContent = justifyH2Text(content);

    function justifyH2Text(content) {
        const $ = cheerio.load(content);

        $('h2, h1, h3, p, h4').css('text-align', 'justify');
        return $.html();
    }


    return (
        <>
            <ImageGallery data={images}></ImageGallery>
            <div className="leading-relaxed mb-4">
                <div dangerouslySetInnerHTML={{ __html: justifiedContent }} />
            </div>
        </>
    )
}

export default ContentContainer;