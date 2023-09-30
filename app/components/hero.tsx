import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./highlighted-text";
import { renderButtonStyle } from "../utils/render-button-style";
import Button from "./button";

import { getHero } from "../lib/api";

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

export default async function Hero() {
  const heroData = await getHero();
  const imgUrl = heroData.heros.nodes[1].featuredImage.node.mediaItemUrl;
  const altText = heroData.heros.nodes[1].featuredImage.node.altText;

  const title = heroData.heros.nodes[1].title;
  const description = heroData.heros.nodes[1].content;
  const buttons = heroData.heros.nodes[1].buttons.nodes;

  return (
    <section className="bg-primary-content text-base-100">
      <div className="flex flex-col lg:flex-row items-center justify-center xl:space-x-56 p-6 mx-auto w-full sm:py-12 lg:py-24">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image
            src={imgUrl || ""}
            alt={altText || "none provided"}
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            width={600}
            height={600}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text={title}
            tag="h1"
            className="text-5xl font-bold leading-none sm:text-6xl mb-8"
            color="text-default"
          />
          <HighlightedText
            text={description}
            tag="p"
            className="mt-6 mb-8 text-lg sm:mb-12 text-justify"
            color="text-default"
          />
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
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
    </section>

  );
}
