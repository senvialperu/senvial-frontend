'use client'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function RadialProgresses({ radialProgresses }: any) {
    const featuredImageUrl = radialProgresses.radialProgresses.nodes[0].featuredImage.node.mediaItemUrl;
    const columnCount = Math.min(4, radialProgresses.radialProgresses.nodes[0].radials.nodes.length); // Calcula el número de columnas máximo como 4 o la longitud de datos si es menor
    const radials = radialProgresses.radialProgresses.nodes[0].radials.nodes;
    const title = radialProgresses.radialProgresses.nodes[0].title;
    const description = radialProgresses.radialProgresses.nodes[0].description;

    console.log(' title: ', title, ' description', description)

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
                <h1 className="text-center pt-10 text-4xl relative font-bold text-white">{title}</h1>
            </div>
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto justify-between items-center py-20 relative text-white`}
                style={{ opacity: 1 }}
            >
                {radials.map((radial: any, index: number) => (
                    <div
                        className="flex flex-col items-center m-5 md:m-10 opacity-100"
                        key={index}
                    >
                        <CircularProgressbar
                            className='w-40 h-40'
                            value={radial.percent}
                            text={`${radial.percent}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '10px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgba(200, 120, 0, ${radial.percent / 100})`,
                                textColor: '#f88',
                                trailColor: '#202020',
                                backgroundColor: '#3e98c7',
                            })} />


                        <h1 className="text-xl m-5 overflow-auto text-justify font-black">{radial.title}</h1>

                        <p className='text-justify'>{radial.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
