/*
import React, { useState } from 'react';
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';

const images = [
    { id: 1, src: image1 },
    { id: 2, src: image2 },
    { id: 3, src: image3 }
];

const ImageGallery = () => {
    const [selectedImageId, setSelectedImageId] = useState(images[0].id);

    const handleImageClick = (id) => {
        setSelectedImageId(id);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.src}
                        alt={`Image ${image.id}`}
                        style={{
                            width: '100px',
                            height: '100px',
                            margin: '10px',
                            border: selectedImageId === image.id ? '2px solid black' : 'none'
                        }}
                        onClick={() => handleImageClick(image.id)}
                    />
                ))}
            </div>
            <div>
                <img
                    src={images.find((image) => image.id === selectedImageId).src}
                    alt={`Selected Image`}
                    style={{ width: '400px', height: '400px' }}
                />
            </div>
        </div>
    );
};

export default ImageGallery;
*/