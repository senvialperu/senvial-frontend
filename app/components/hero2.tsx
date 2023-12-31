import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./highlighted-text";
import { renderButtonStyle } from "../utils/render-button-style";
import { getHero } from "../lib/api";

// boton
import Button from "./button";

interface Button {
    id: string;
    url: string;
    text: string;
    type: string;
    newTab: boolean;
}

interface Picture {
    data: {
        id: string;
        attributes: {
            url: string;
            name: string;
            alternativeText: string;
        };
    };
}

interface HeroProps {
    data: {
        id: string;
        title: string;
        description: string;
        picture: Picture;
        buttons: Button[];
    };
}

export default async function HeroLeft() {
    const heroData = await getHero();
    const imgUrl = heroData.heros.nodes[0].featuredImage.node.mediaItemUrl;
    const altText = heroData.heros.nodes[0].featuredImage.node.altText;

    const title = heroData.heros.nodes[0].title;
    const description = heroData.heros.nodes[0].content;
    const buttons = heroData.heros.nodes[0].buttons.nodes;
    return (

        <section className="bg-primary-content text-base-100 items-center justify-end flex" style={{ background: `url(${imgUrl})`, backgroundSize: 'cover' }}>
            <div className="items-center p-6 sm:py-12 lg:py-24 xl:w-[42%] ">
                <div className=" lg:ml-auto p-10 text-center rounded-lg  lg:text-left bg-primary-content h-auto min-w-fit ">
                    <HighlightedText
                        text={title}
                        tag="h1"
                        className="text-2xl font-bold leading-none sm:text-6xl mb-8 overflow-clip relative md:text-5xl sm:text:3xl"
                        color="text-default"
                    />
                    <HighlightedText
                        text={description}
                        tag="p"
                        className="tmt-6 mb-8 text-lg sm:mb-12 h-auto text-justify relative"
                        color="text-default"
                    />
                    <div className="flex flex-col space-y-4 sm:items-center h-auto sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        {buttons.map((button: any, index: number) => (
                            <Button key={index} className={renderButtonStyle("primary")}>
                                <Link
                                    key={index}
                                    href={button.url}
                                    target={button.newTab ? "_blank" : "_self"}
                                >
                                    {button.text}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}
