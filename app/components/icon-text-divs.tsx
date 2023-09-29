
//import { User, Lightbulb, Like, Clock } from './svgs/index'
import { Lightbulb } from './svgs/Lightbulb';
import { User } from './svgs/User';
import { Like } from './svgs/Like';
import { Clock } from './svgs/Clock';

function RenderIcons({ type }: { type: string }) {
    switch (type) {
        case "user":
            return <User width={100} height={100} />;
        case "lightbulb":
            return <Lightbulb width={100} height={100} />;
        case "like":
            return <Like width={100} height={100} />;
        case "clock":
            return <Clock width={100} height={100} />;
        default:
            return null;
    }
}

interface feature {
    text: string;
    icon: string;
}

export default function IconTextDivs({ data: { iconTextDivs } }: any) {
    const cols = Math.min(4, iconTextDivs.length);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
            {iconTextDivs.nodes.map((iconText: any, index: number) => (
                <div
                    className={`flex flex-col h-auto min-h-full items-center br-10 bg-neutral-content p-5 py-10 lg:p-10 text-left${index < iconTextDivs.nodes - 1 && 'border-neutral-content'
                        } ${index % cols === cols - 1 && 'lg:border-r-2'}`}
                    key={index}
                >
                    <RenderIcons type={iconText.icon[0]} />
                    <h1 className="text-xl text-primary-content mt-10 text-justify">{iconText.text}</h1>
                </div>
            ))}
        </div>
    );
}


