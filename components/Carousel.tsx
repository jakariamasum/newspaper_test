"use client";
import React, { useState, useEffect, useRef } from 'react';

interface CarouselItem {
  img: string;
  link: string;
  title: string;
  featured: string;
  sele: string;
  price: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(handleNext, 9000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Update the number of items to show based on the screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) setItemsToShow(1.5); // Mobile
      else if (window.innerWidth < 768) setItemsToShow(2); // Small tablets
      else if (window.innerWidth < 1024) setItemsToShow(3); // Tablets
      else if (window.innerWidth < 1280) setItemsToShow(4); // Small desktops
      else setItemsToShow(5); // Large desktops
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const displayedItems = items
    .slice(startIndex, startIndex + itemsToShow)
    .concat(items.slice(0, Math.max(0, startIndex + itemsToShow - items.length)));

  return (
    <div className="relative">
      <div ref={containerRef} className="flex overflow-hidden transition-transform duration-500">
        {displayedItems.map((item, index) => (
          <div key={index} className={`w-1/${itemsToShow} p-2 transition-opacity duration-500`}>
            <a href={item.link} className="block border rounded-lg">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="mt-2">
                <h3 className="text-sm font-bold">{item.title}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
        Left
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
        Right
      </button>
      <div className="flex justify-center mt-4">
        {Array(Math.ceil(items.length / itemsToShow)).fill(0).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 mx-1 rounded-full ${i === Math.floor(startIndex / itemsToShow) ? 'bg-blue-500' : 'bg-gray-400'}`}>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
