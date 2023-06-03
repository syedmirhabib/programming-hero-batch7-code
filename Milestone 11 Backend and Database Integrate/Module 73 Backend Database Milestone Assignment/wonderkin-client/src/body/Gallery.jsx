import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: '/doll1.jpg', alt: 'Image 1' },
    { id: 2, src: '/doll2.jpg', alt: 'Image 2' },
    { id: 3, src: '/doll3.jpg', alt: 'Image 3' },
    { id: 4, src: '/doll4.jpg', alt: 'Image 4' },
    { id: 5, src: '/doll5.jpg', alt: 'Image 5' },
    { id: 6, src: '/doll1.jpg', alt: 'Image 6' },
    { id: 7, src: '/doll2.jpg', alt: 'Image 7' },
    { id: 8, src: '/doll3.jpg', alt: 'Image 8' },
    
    // Add more images here
  ];

  return (
    <div className="my-8 mx-auto max-w-6xl flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-gray-200 p-2 rounded-lg flex items-center justify-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
