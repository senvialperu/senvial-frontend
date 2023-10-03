'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import slider1 from '@/public/slider1.webp';
import slider2 from '@/public/slider2.webp';

export default function Slider({ data }: any) {
    const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

    const slides = data.sliders.nodes[0].slides.nodes;

    const handleImageLoad = (index: number) => {
        const updatedImagesLoaded = [...imagesLoaded];
        updatedImagesLoaded[index] = true;
        setImagesLoaded(updatedImagesLoaded);
    };

    return (
        <div className='relative flex'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-auto w-full"
            >
                {slides.map((item: any, index: number) => (
                    <SwiperSlide key={index} className="relative">
                        <div className="absolute max-w-xl lg:-top-[15rem] lg:ml-[12rem] inset-0 flex items-center justify-left">
                            <h1 className="text-white bg-black p-4 text-center bg-opacity-80 text-sm md:text-xl lg:text-2xl 2xl:text-4xl">
                                {item.text || ''}
                            </h1>
                        </div>
                        <Image
                            src={item.image.sourceUrl || ''}
                            alt={item.image.sourceUrl || ''}
                            width={1920}
                            height={1080}
                            priority={true}
                            onLoad={() => handleImageLoad(index)}
                        />
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <div className="absolute max-w-xl lg:top-[15rem] lg:right-0 lg:mr-20 inset-y-0 flex items-center justify-end">
                        <h1 className="text-white bg-black p-4 text-center bg-opacity-80 text-sm md:text-xl lg:text-2xl 2xl:text-4xl">
                            FABRICACIÓN DE INSUMOS VIALES, CON LOS ESTÁNDARES REGLAMENTARIOS.
                        </h1>
                    </div>
                    <Image
                        src={slider2}
                        alt="slider2"
                        width={1920}
                        height={1080}
                        priority={true}
                        onLoad={() => handleImageLoad(0)}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
