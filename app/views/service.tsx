'use client'
import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import Image from 'next/image';

function justifyH2Text(content) {
    const $ = cheerio.load(content);

    // Selecciona todas las etiquetas <h2>, <h1>, <h3>, <p>, <h4> dentro del contenido HTML y aplica estilos CSS.
    $('h2, h1, h3, p, h4').css('text-align', 'justify');

    return $.html();
}


export default function Service({ data }: { data: any }) {
    console.log('data service', data)
    const { title, description, picture, content } = data;
    const justifiedContent = justifyH2Text(content);

    return (
        <article className="space-y-8">
            {picture.souceUrl && (
                <Image
                    src={picture.souceUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg"
                />
            )}
            <div className="space-y-6">
                <h1 className="leading-tight text-5xl font-bold text-primary-content">{title}</h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                </div>
            </div>

            <div className="text-primary-content">
                <p>{description}</p>
            </div>
            <div className="leading-relaxed mb-4">
                <div dangerouslySetInnerHTML={{ __html: justifiedContent }} />
            </div>
        </article>
    );
}
