"use client";

import { Caveat, Chakra_Petch, Satisfy } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

const caveat = Caveat({ weight: "600", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });


const feedbacks = [
  {
    name: "John Doe",
    review: "The food was absolutely amazing! Highly recommend the pizza.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Jane Smith",
    review: "The service was excellent, and the ambiance was great.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Michael Brown",
    review: "I loved the pasta, but the dessert stole the show!",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Emily Davis",
    review: "Good food, but the wait time was a bit long.",
    rating: "⭐⭐⭐⭐",
  },
  {
    name: "Chris Wilson",
    review: "Affordable prices and delicious meals. Will visit again!",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Sophia Johnson",
    review: "A wonderful dining experience with family. Loved it!",
    rating: "⭐⭐⭐⭐⭐",
  },
];

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
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
    <div className="flex flex-col items-center gap-6 p-6 relative bg-darkpeach rounded-lg shadow-md">

      <div className="flex justify-between w-full items-center">
        <h1 className={`text-4xl font-bold text-center text-[#8f613c] relative z-10 ${chakra_petch.className}`}>Feedbacks</h1>
        <button
          className="text-sm absolute  button-hover-effect-border bg-transparent rounded-full"
          onClick={() => alert("Comming Soon")}
        >
          <span className="px-2 flex justify-center items-center gap-1"><IoIosAdd size={24}/> Feedback </span>
        </button>
      </div>

      <div className="relative w-full max-w-xl overflow-hidden ">
        <div
          className="flex justify-start items-center transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex justify-start items-center w-full p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center">
              <Image
                src={"/Team01.png"}
                alt="Team 01"
                width={100}
                height={100}
                className="rounded-full w-16 h-16"
              />
            </div>
            
            <div className="flex flex-col justify-center items-start pl-2">
              <div className="flex justify-between items-center w-full">
              <h1
                className={`text-2xl font-bold text-[#8f613c] ${caveat.className}`}
              >
                {feedback.name}
              </h1>
              <p  className={`text-yellow-500 text-sm mt-1 ${satisfy.className}`}>{feedback.rating}</p>
              </div>
              <p className={`text-[#8f613c] text-sm mt-1 ${satisfy.className}`}>{feedback.review}</p>
              
              </div>
             
            </div>
          ))}
        </div>

        <button
          onClick={goToPreviousSlide}
          className="absolute w-10 h-10 top-1/2 left-2 rotate-180 flex justify-center items-center -translate-y-1/2 bg-[#8f592d] bg-opacity-50 duration-150 transition text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <IoMdArrowRoundForward/>
        </button>

        <button
          onClick={goToNextSlide}
         className="absolute w-10 h-10 top-1/2 right-2 flex justify-center items-center -translate-y-1/2 bg-[#8f592d] bg-opacity-50 duration-150 transition text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <IoMdArrowRoundForward />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        {feedbacks.map((_, index) => (
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

export default Feedback;
