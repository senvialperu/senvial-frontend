'use client'
import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import Image from 'next/image';

function justifyH2Text(content) {
    const $ = cheerio.load(content);

    // Selecciona todas las etiquetas <h2>, <h1>, <h3>, <p>, <h4> dentro del contenido HTML y aplica estilos CSS.
    $('h2, h1, h3, p, h4').css('text-align', 'justify');

    const imgDiv = $('<div class="grid-container"></div>').css({
        display: 'grid',
        justifyContent: 'center', // Puedes ajustar la alineación según tus necesidades
        alignItems: 'center',    // Puedes ajustar la alineación según tus necesidades
        margin: '0 auto',
    });

    $('img').wrapAll(imgDiv);
    return $.html();
}


export default function Product({ data }: { data: any }) {
    const { title, description, picture, content } = data[0].node;

    // Justifica el contenido HTML antes de usarlo
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
                <h1 className="leading-tight text-5xl font-bold text-primary-content flex">{title}</h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                </div>
            </div>

            <div className="leading-relaxed mb-4">
                <div dangerouslySetInnerHTML={{ __html: justifiedContent }} />
            </div>

        </article>
    );
}