"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const Slider = () => {
  const slides = [
    { id: 1, image: "/weekly-images/slider01.png", url: "/weekly-menu" },
    { id: 2, image: "/weekly-images/slider02.png", url: "/special-menu" },
    { id: 3, image: "/weekly-images/slider03.png", url: "/our-menu" },
    { id: 4, image: "/weekly-images/slider04.png", url: "/" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-full overflow-hidden top-20 rounded-xl">
      <div
        className="relative w-full flex transition-transform duration-500 rounded-md"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-80 flex-shrink-0 flex items-center justify-center rounded-md"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link
              href={slide.url}
              className="text-sm absolute top-[40%] right-[30%] md:right-[40%] button-hover-effect bg-transparent rounded-full"
            >
              <span className="px-4">Check now</span>
            </Link>
          </div>
        ))}
      </div>

      <button
        onClick={goToPreviousSlide}
        className="absolute w-10 h-10 top-1/2 left-2 rotate-180 flex justify-center items-center -translate-y-1/2 bg-[#8f592d] bg-opacity-50 duration-150 transition text-white p-2 rounded-full hover:bg-opacity-75"
      >
        <IoMdArrowRoundForward />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute w-10 h-10 top-1/2 right-2 flex justify-center items-center -translate-y-1/2 bg-[#8f592d] bg-opacity-50 duration-150 transition text-white p-2 rounded-full hover:bg-opacity-75"
      >
        <IoMdArrowRoundForward />
      </button>

      <div className="absolute flex justify-center items-center bottom-4 right-5 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`border-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-darkorange w-3 h-3 border-darkpeach"
                : "bg-peach w-2 h-2 border-darkpeach"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
