"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@sanity/client";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { Caveat, Chakra_Petch, Satisfy } from "next/font/google";
import type { Feedback } from "@/sanity/Types/schemasTypes";

const caveat = Caveat({ weight: "600", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export default function Feedback() {
  const { user } = useUser();
  const [stars, setStars] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const query = `*[_type == 'feedback'] | order(createdAt desc)`;
      const data = await client.fetch(query);
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to submit feedback");
    if (!feedback.trim()) return alert("Feedback cannot be empty");

    setLoading(true);

    const feedbackData = {
      _type: "feedback",
      name: user.fullName,
      image: user.imageUrl,
      stars,
      feedback,
      createdAt: new Date().toISOString(),
    };

    try {
      await client.create(feedbackData);
      setStars(0);
      setFeedback("");
      setIsOpen(false);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

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
  }, [feedbacks]);

  return (
    <div className="flex flex-col items-center gap-6 p-10 bg-darkpeach rounded-lg shadow-md">
      <div className="flex justify-between w-full items-center">
        <h1
          className={`text-4xl font-bold text-[#8f613c] ${chakra_petch.className}`}
        >
          Feedbacks
        </h1>
        <button
          className="button-hover-effect-border bg-transparent rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <span className="px-2 flex justify-center items-center gap-1">
            <IoIosAdd size={24} /> Feedback
          </span>
        </button>
      </div>

      <div className="relative w-full max-w-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center h-56 relative z-50 w-full p-8 rounded-lg shadow-lg">
            <Image
              src="/default-avatar.png"
              alt="unknown user"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="pl-2">
              <h1
                className={`text-2xl font-bold text-[#8f613c] ${caveat.className}`}
              >
                Loading...
              </h1>
              <p className="text-black/50 animate-pulse text-sm">⭐⭐⭐⭐⭐</p>
              <div
                className={`text-[#8f613c] text-sm flex flex-col gap-2 ${satisfy.className}`}
              >
                <span className="w-20 bg-black/50 h-4 rounded"></span>
                <span className="w-20 bg-black/50 h-4 rounded"></span>
                <span className="w-20 bg-black/50 h-4 rounded"></span>
              </div>
            </div>
          </div>
        ) : feedbacks.length > 0 ? (
          <>
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center w-full p-8 rounded-lg shadow-lg"
                >
                  <Image
                    src={feedback.image || "/default-avatar.png"}
                    alt={feedback.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="pl-2">
                    <h1
                      className={`text-2xl font-bold text-[#8f613c] ${caveat.className}`}
                    >
                      {feedback.name}
                    </h1>
                    <p className="text-yellow-500 text-sm">
                      {"⭐".repeat(feedback.stars)}
                    </p>
                    <p
                      className={`text-[#8f613c] text-sm mt-1 ${satisfy.className}`}
                    >
                      {feedback.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={goToPreviousSlide}
              className="absolute top-1/2 left-2 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
              aria-label="Previous slide"
            >
              <IoMdArrowRoundForward className="rotate-180" />
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute top-1/2 right-2 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
              aria-label="Next slide"
            >
              <IoMdArrowRoundForward />
            </button>

            <div className="absolute flex justify-center items-center bottom-4 right-5 space-x-2">
              {feedbacks.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`border-2 rounded-full transition-all relative top-2 z-50 duration-300 focus:outline-none ${
                    currentIndex === index
                      ? "bg-darkorange w-3 h-3 border-darkpeach"
                      : "bg-peach w-2 h-2 border-darkpeach"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center w-full p-8 rounded-lg shadow-lg">
            <Image
              src="/default-avatar.png"
              alt="unknown user"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="pl-2">
              <h1
                className={`text-2xl font-bold text-[#8f613c] ${caveat.className}`}
              >
                <span>Unkown User</span>
              </h1>
              <p className="text-black/50 animate-pulse flex justify-center items-center gap-2 text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-black/50 text-lg" />
                ))}{" "}
              </p>
              <div
                className={`text-[#8f613c] text-sm mt-1 flex flex-col gap-1 ${satisfy.className}`}
              >
                <span className="w-40 bg-black/50 h-2 animate-pulse rounded"></span>
                <span className="w-40 bg-black/50 h-2 animate-pulse rounded"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur z-50 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2
              className={`text-2xl font-bold text-[#8f613c] text-center mb-2 ${chakra_petch.className}`}
            >
              Feedback
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className={`text-lg block mb-1 font-bold text-black ${chakra_petch.className}`}
                >
                  Rating:
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-2xl ${
                        star <= stars ? "text-yellow-600" : "text-black/50"
                      }`}
                      onClick={() => setStars(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  className={`text-lg block mb-1 font-bold text-black ${chakra_petch.className}`}
                >
                  Feedback:
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={6}
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full rounded-md ${loading ? "bg-black/50 cursor-not-allowed py-2" : "button-hover-effect"}`}
                disabled={loading}
              >
                <span className="w-full rounded-md">
                  {loading ? "Submitting..." : "Submit"}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
