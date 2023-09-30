import Image from "next/image";

export default function TrustedBy({ data: { clientes } }: any) {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-32">
                <div>
                    <h1 className="text-center font-semibold leading-8 text-primary-content text-4xl">
                        {clientes.nodes[0].title}
                    </h1>
                </div>
                <div className="mx-auto h-auto mt-10 max-w-lg grid-cols-2 lg:grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 grid cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none">
                    {clientes.nodes[0].picture.map((picture: any, index: number) => (
                        <Image key={index} src={picture.sourceUrl} width={200} height={200} alt={""} />
                    ))}
                </div>
            </div>
        </div>
    );
}