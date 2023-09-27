'use client'

import { RadialProgress } from 'react-daisyui'

interface Feature {
    id: string;
    title: string;
    description: string;
    showLink: boolean;
    newTab: boolean;
    url: string;
    text: number;
}


export default function RadialProgresses({ radialProgresses }: any) {
    console.log('radial data', radialProgresses.radialProgresses.nodes[0].radials.nodes)
    const featuredImageUrl = radialProgresses.radialProgresses.nodes[0].featuredImage.node.mediaItemUrl;
    const columnCount = Math.min(4, radialProgresses.radialProgresses.nodes[0].radials.nodes.length); // Calcula el número de columnas máximo como 4 o la longitud de datos si es menor
    console.log('columnCount', columnCount)
    const radials = radialProgresses.radialProgresses.nodes[0].radials.nodes;
    const title = radialProgresses.radialProgresses.nodes[0].title;
    const description = radialProgresses.radialProgresses.nodes[0].description;


    return (
        <div className="relative">
            <div
                className="absolute inset-0"
                style={{
                    background: `url(${featuredImageUrl})`,
                    opacity: 0.5,
                    backgroundBlendMode: "darken",
                    backgroundSize: "cover",
                }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-75"></div>
            <div className="items-center relative">
                <strong>
                    <h1 className="text-center pt-10 text-4xl relative z-10">{title}</h1>
                </strong>
                <p className="text-center pt-5 text-xl relative z-10">{description}</p>
            </div>
            <div
                className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-${columnCount} mx-auto justify-between items-center py-20 relative text-white`}
                style={{ opacity: 1 }}
            >
                {radials.map((radial: any) => (
                    <div
                        className="flex flex-col items-center m-5 md:m-10 opacity-100"
                        key={radial.title}
                    >
                        <RadialProgress
                            value={radial.percent}
                            title={radial.title}
                            size="10rem"
                            thickness="10px"
                        >
                            {radial.text} %
                        </RadialProgress>
                        <strong>
                            <h1 className="text-xl m-5 overflow-auto">{radial.title}</h1>
                        </strong>
                        <p>{radial.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
