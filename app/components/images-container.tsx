import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ImageGallery = ({ data }: any) => {
    console.log('data images container', data.data.images);
    const images = data.data.images;
    const [selectedImageId, setSelectedImageId] = useState(images[0].id);

    const handleImageClick = (id: any) => {
        console.log(id);
        setSelectedImageId(id);
    };

    return (
        <div className='flex flex-col lg:flex-row '>
            <div className='flex space-y-10 flex-row gap-4 lg:gap-0 md:flex-col m-auto'>
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
                style={{ flex: '1' }} // Añadir esta línea para que ocupe todo el espacio vertical disponible
            >
                <Image
                    src={images.find((image: any) => image.id === selectedImageId).sourceUrl}
                    alt={`Selected Image`}
                    width={600}
                    height={400}
                    className='rounded-lg'
                />
            </motion.div>
        </div>
    );
};

export default ImageGallery;