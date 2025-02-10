"use client";

import useBasketStore from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 sm:w-28 sm:h-28 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="sm:w-40 sm:h-40 w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-5xl font-bold mb-6 text-center sm:w-max">
          Thanks for your Order!
        </h1>

        <div className="border-t border-b border-gray-200 py-6 ">
          <p className="text-lg text-black/70 mb-4">
            Your order has been confirmed and will be shipped shortly .
          </p>
          <div className="space-y-2">
            {orderNumber && (
              <p className="space-x-5 flex items-center text-black/60">
                <span>Order Number: </span>
                <span className="font-mono text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="space-y-8">
            <p className="text-black/60">A confirmation email has been sent to your email address.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button>
                <Link href="/orders">Rate the Website</Link>
              </button>
              <button>
                <Link href={"/"}>Continue Shopping</Link>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
