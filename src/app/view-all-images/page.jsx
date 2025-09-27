"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos, MdClose, MdArrowBackIosNew, MdArrowForwardIos, MdDownload, MdFavorite, MdShare } from "react-icons/md";

export default function ViewAllImage() {
  const images = [
    {
      src: "/Image/propertyImage/image1.jpg",
      width: 400,
      height: 600,
    },
    {
      src: "/Image/propertyImage/image2.jpg", 
      width: 400,
      height: 300,
    },
    {
      src: "/Image/propertyImage/image3.jpg",
      width: 400,
      height: 500,
    },
    {
      src: "/Image/propertyImage/image4.jpg",
      width: 400,
      height: 400,
    },
    {
      src: "/Image/propertyImage/image5.jpg",
      width: 400,
      height: 350,
    },
    {
      src: "/Image/propertyImage/image6.jpg",
      width: 400,
      height: 450,
    },
    {
      src: "/Image/propertyImage/image7.jpg",
      width: 400,
      height: 320,
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex gap-2 items-center cursor-pointer hover:text-gray-600 transition-colors">
            <MdArrowBackIos className="text-lg" />
            <Link href={"/dashboard"} className="font-medium text-gray-800">Back to search</Link>
          </div>
          <Image
            src="/HomePageLogo.svg"
            alt="home-page-logo"
            height={40}
            width={120}
          />
          <div className="w-32"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Gallery Stats */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Property Photos</h1>
          <p className="text-gray-600">{images.length} photos</p>
        </div>

        {/* Featured Image + Grid Layout */}
        <div className="space-y-6">
          {/* Main Featured Image */}
          {images.length > 0 && (
            <div
              className="relative group cursor-pointer w-full"
              onMouseEnter={() => setHoveredImage(0)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => openLightbox(0)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300">
                <Image
                  src={images[0].src}
                  alt="Main property image"
                  width={1200}
                  height={600}
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
                  hoveredImage === 0 ? 'opacity-100' : 'opacity-0'
                }`}>
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110">
                      <MdFavorite className="text-gray-700 text-lg" />
                    </button>
                    <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110">
                      <MdShare className="text-gray-700 text-lg" />
                    </button>
                  </div>
                  
                  {/* Download Button */}
                  <div className="absolute bottom-4 right-4">
                    <button className="bg-white bg-opacity-90 hover:bg-opacity-100 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2">
                      <MdDownload className="text-gray-700 text-lg" />
                      <span className="text-gray-700 font-medium text-sm">Download</span>
                    </button>
                  </div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-medium">Main Photo</div>
                    <div className="text-xs opacity-80">{images[0].width} × {images[0].height}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Remaining Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {images.slice(1).map((image, index) => {
                const actualIndex = index + 1;
                return (
                  <div
                    key={actualIndex}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredImage(actualIndex)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onClick={() => openLightbox(actualIndex)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300">
                      <Image
                        src={image.src}
                        alt={`Property image ${actualIndex + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
                        hoveredImage === actualIndex ? 'opacity-100' : 'opacity-0'
                      }`}>
                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-110">
                            <MdFavorite className="text-gray-700 text-sm" />
                          </button>
                          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-110">
                            <MdShare className="text-gray-700 text-sm" />
                          </button>
                        </div>
                        
                        {/* Download Button */}
                        <div className="absolute bottom-3 right-3">
                          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 px-3 py-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-1.5">
                            <MdDownload className="text-gray-700 text-sm" />
                            <span className="text-gray-700 font-medium text-xs">Download</span>
                          </button>
                        </div>
                        
                        {/* Image Info */}
                        <div className="absolute bottom-3 left-3 text-white">
                          <div className="text-xs font-medium">Photo {actualIndex + 1}</div>
                          <div className="text-xs opacity-80">{image.width} × {image.height}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-white z-50 flex flex-col"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={closeLightbox}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MdClose size={24} className="text-gray-600" />
              </button>
              <div>
                <h3 className="font-semibold text-gray-900">Photo {selectedImage + 1} of {images.length}</h3>
                <p className="text-sm text-gray-500">{images[selectedImage].width} × {images[selectedImage].height}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MdFavorite size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MdShare size={20} className="text-gray-600" />
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <MdDownload size={18} />
                Download
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 flex items-center justify-center relative p-6">
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 hover:bg-gray-100 rounded-full transition-colors z-10"
                  disabled={selectedImage === 0}
                >
                  <MdArrowBackIosNew size={24} className="text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 hover:bg-gray-100 rounded-full transition-colors z-10"
                  disabled={selectedImage === images.length - 1}
                >
                  <MdArrowForwardIos size={24} className="text-gray-600" />
                </button>
              </>
            )}

            {/* Main image */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={images[selectedImage].src}
                alt={`Property image ${selectedImage + 1}`}
                width={images[selectedImage].width}
                height={images[selectedImage].height}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Modal Footer - Thumbnails */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

