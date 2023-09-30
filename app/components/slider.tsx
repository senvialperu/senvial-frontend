'use client'
// Importa React y el componente Image de Next.js
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Define la interfaz de los datos que se esperan
interface CarouselData {
    data: {
        picture: {
            data: {
                id: number;
                attributes: {
                    url: string;
                    alternativeText: string | null;
                    caption: string | null;
                    width: number;
                    height: number;
                };
            }[];
        };
    };
}

// Define el componente DefaultCarousel
export default function Slider({ data }: any) {
    const swiperElRef = useRef<HTMLDivElement>(null);

    // Extrae la lista de imágenes de los datos
    const slides = data.sliders.nodes[0].slides.nodes
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-auto w-full"
            >

                {slides.map((item: any, index: number) => {
                    return (
                        <SwiperSlide key={index} className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-white bg-black p-4 text-center bg-opacity-80 text-4xl">
                                    {item.text || ''}
                                </h1>
                            </div>
                            <Image
                                src={item.image.sourceUrl || ''}
                                alt={item.image.sourceUrl || ''}
                                width={1920}
                                height={1080}
                            />
                        </SwiperSlide>
                    )
                })}


            </Swiper>
        </>
    )
}
