'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ImageGallery = ({ data }: any) => {
    const images = data.data.images;
    const [selectedImageId, setSelectedImageId] = useState(images[0].id);

    const handleImageClick = (id: any) => {
        setSelectedImageId(id);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageForModalClick = () => {
        setIsModalOpen(true);
    }

    const closeImageModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyPressed = (e: any) => {
        if (e.key === 'Escape') {
            setIsModalOpen(false);
        }
    }

    useEffect(() => {
        const handleKeyPressed = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyPressed);

        return () => {
            window.removeEventListener('keydown', handleKeyPressed);
        };
    }, [isModalOpen]);


    return (
        <div className='flex flex-col lg:flex-row '>
            <div className='flex space-y-10 flex-row gap-4 lg:gap-0 lg:flex-col m-auto'>
                {images.map((image: any) => (
                    <motion.button
                        key={image.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Image
                            src={image.sourceUrl}
                            alt={`Image ${image.altText}`}
                            style={{
                                border: selectedImageId === image.id ? '2px solid black' : 'none',
                                opacity: selectedImageId === image.id ? 1 : 0.6,
                            }}
                            onClick={() => handleImageClick(image.id)}
                            width={100}
                            height={80}
                            className='m-0 object-cover rounded-lg transition-opacity duration-300'
                        />
                    </motion.button>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className='items-center lg:m-10'
                style={{
                    flex: '1',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: isModalOpen ? 10 : 'auto',
                }}
                onClick={() => handleImageForModalClick()}
            >
                <Image
                    src={images.find((image: any) => image.id === selectedImageId).sourceUrl}
                    alt={`Selected Image`}
                    width={600}
                    height={400}
                    className='rounded-lg'
                />

            </motion.div>
            {isModalOpen && (
                <motion.div
                    className='fixed top-0 z-20 transition ease-in-out left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-75'
                    onClick={closeImageModal}
                    onKeyPress={(e) => handleKeyPressed(e)}// Cerrar el modal haciendo clic fuera de la imagen
                >
                    <div className='relative'>
                        <motion.div
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='relative m-10'>
                            <Image
                                src={images.find((image: any) => image.id === selectedImageId).sourceUrl}
                                alt={`Selected Image`}
                                width={800}
                                height={600}
                                className='rounded-lg'
                            />

                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ImageGallery;