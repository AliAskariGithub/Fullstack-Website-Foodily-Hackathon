"use client";

import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { COUPON_CODE } from "@/sanity/lib/couponCode";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Chakra_Petch, Satisfy } from "next/font/google";
import { client } from "@/sanity/lib/client";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

const BasketPage = () => {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [isCodChecked, setIsCodChecked] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState({
    name: `${isSignedIn ? user?.fullName : ""}`,
    email: `${isSignedIn ? user?.emailAddresses : ""}`,
    address: "",
    phone: "",
    region: "",
    landmark: "",
    category: "Home",
  });

  const isUserFormValid =
    userDetails.name &&
    userDetails.email &&
    userDetails.phone &&
    userDetails.address &&
    userDetails.region;

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const deliveryFee = 150;
  const taxPercentage = 0.0384762;

  const totalPrice = useBasketStore.getState().getTotalPrice();
  const taxAmount = totalPrice * taxPercentage;
  const grandTotal = totalPrice + taxAmount + deliveryFee - discount;

  const clearBasket = useBasketStore.getState().clearBasket;

  const handleCheckout = async () => {
    if (!isSignedIn || !isCodChecked || !acceptTerms) {
      alert("Please sign in, select Cash on Delivery, and accept the terms.");
      return;
    }
  
    const orderData = {
      _type: "order",
      orderId: Math.random().toString(36).substr(2 ,146),
      customerName: userDetails.name, 
      customerEmail: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
      items: groupedItems.map((item) => ({
        image: item.food.image,
        food: item.food.name,
        quantity: item.quantity,
        price: item.food.price,
      })),
      totalPrice: grandTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  
    try {
      await client.create(orderData);
      console.log("Order successfully created in Sanity!");
    } catch (error) {
      console.error("Error creating order: ", error);
      alert("An error occurred while placing your order. Please try again.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      clearBasket();
      router.push("/success");
    } catch (error) {
      console.error("Error during checkout process: ", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    

  const handleCouponSubmit = () => {
    let validCoupon = false;
    Object.keys(COUPON_CODE).forEach((key) => {
      if (
        (
          COUPON_CODE[
            key as keyof typeof COUPON_CODE
          ] as unknown as string[]
        ).includes(couponCode)
      ) {
        validCoupon = true;
      }
    });

    if (validCoupon) {
      const discountAmount = totalPrice * 0.05;
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4  flex flex-col items-center justify-center h-screen">
        <div className="absolute -z-10 top-[35%] md:top-[20%] text-black/15 text-[40vh] md:text-[60vh]">
          <TiShoppingCart />
        </div>
        <div className="absolute top-1/2 flex flex-col justify-center items-center z-10">
          <h1 className="text-4xl font-bold mb-6 text-black/80">
            Your Cart is Empty.
          </h1>
          <p className="text-black/60 text-xl">
            Explore our foods and add items to your cart
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb className="absolute md:flex hidden sm:top-16  left-16 mt-2 sm:mt-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="container mx-auto pl-5 pr-2 max-w-6xl mt-6 md:pl-16">
      <h1
          className={`text-4xl font-bold text-center mb-8 text-[#8f613c] relative ${chakra_petch.className}`}
        >
          Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            {groupedItems?.map((item) => (
              <div
                key={item.food?._id}
                className="mb-4 p-2 md:p-4 bg-gradient-to-r from-[#e9b966] via-[#e1d3b6] to-[#e9b966] border border-[#8f613c] shadow-lg mt-6 rounded flex items-center justify-between"
              >
                <div
                  className="flex flex-1 items-center max-w-0 cursor-pointer"
                  onClick={() => router.push(`/foods/${item.food?._id}`)}
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-24 flex-shrink-0 mr-4">
                    {item.food?.image && item.food.image.asset?.url && (
                      <Image
                        src={item.food.image.asset.url}
                        alt={item.food.name ?? "food Image"}
                        className="w-full h-full object-cover rounded"
                        width={1000}
                        height={1000}
                      />
                    )}
                  </div>
                  <div className="min-w-max">
                    <h2 className={`text-lg sm:text-xl font-semibold truncate ${satisfy.className}`}>
                      {item.food?.name}
                    </h2>
                    <p className={`text-sm sm:text-base mt-1 ${satisfy.className}`}>Rs{" "}
                      {((item.food?.price ?? 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="md:w-40 relative z-0 right-0">
                  <AddToBasketButton food={item.food} />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit pl-16 lg:pl-6 bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items: </span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Subtotal: </span>
              <span>Rs {totalPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (3.8%): </span>
              <span>Rs {taxAmount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Fee: </span>
              <span>Rs {deliveryFee.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total: </span>
              <span>Rs {grandTotal.toFixed(2)}</span>
            </p>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter coupon code for more discount"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 border rounded-md mb-2 text-[15px]"
              />
              <button
                onClick={handleCouponSubmit}
                className={`w-full  p-2 rounded-md duration-150 transition-all ${couponCode ? "cursor-pointer" : "opacity-70 cursor-not-allowed"}`}
              >
                Apply Coupon
              </button>
            </div>
          </div>

            {isSignedIn ? (
              <>
                <button
                  className="w-full bg-black text-white hover:bg-black/70 duration-200 transition-all px-4 py-2 rounded mt-4 disabled:bg-black/30"
                  onClick={() => setShowPopover(true)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>

                {showPopover && (
                  <>
                    {showUserForm && (
                      <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative z-[10000]">
                          <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Add Shipping Address
                          </h2>
                          <form>
                            <div className="space-y-4">
                              <input
                                type="text"
                                placeholder="Recipient’s Name *"
                                value={userDetails.name}
                                onChange={(e) =>
                                  setUserDetails({
                                    ...userDetails,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                              <input
                                type="email"
                                placeholder="Email Address *"
                                value={userDetails.email}
                                onChange={(e) =>
                                  setUserDetails({
                                    ...userDetails,
                                    email: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                              <input
                                type="text"
                                placeholder="Phone Number *"
                                value={userDetails.phone}
                                onChange={(e) =>
                                  setUserDetails({
                                    ...userDetails,
                                    phone: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                              <input
                                type="text"
                                placeholder="Region/City/District *"
                                value={userDetails.region}
                                onChange={(e) =>
                                  setUserDetails({
                                    ...userDetails,
                                    region: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                              <input
                                type="text"
                                placeholder="Address *"
                                value={userDetails.address}
                                onChange={(e) =>
                                  setUserDetails({
                                    ...userDetails,
                                    address: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                              <input
                                type="text"
                                placeholder="Landmark (Optional)"
                                value={userDetails.landmark}
                                onChange={(e) =>
                                  setUserDetails({
                                    ...userDetails,
                                    landmark: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                              <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="addressCategory"
                                    value="Home"
                                    checked={userDetails.category === "Home"}
                                    onChange={() =>
                                      setUserDetails({
                                        ...userDetails,
                                        category: "Home",
                                      })
                                    }
                                    className="h-4 w-4 border-gray-300 rounded focus:ring-black"
                                  />
                                  <span className="ml-2 text-gray-600">
                                    Home
                                  </span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="addressCategory"
                                    value="Office"
                                    checked={userDetails.category === "Office"}
                                    onChange={() =>
                                      setUserDetails({
                                        ...userDetails,
                                        category: "Office",
                                      })
                                    }
                                    className="h-4 w-4 border-gray-300 rounded focus:ring-black"
                                  />
                                  <span className="ml-2 text-gray-600">
                                    Office
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="mt-6 flex justify-between">
                              <button
                                type="button"
                                className="border-red-500 border text-red-500 hover:text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                onClick={() => setShowUserForm(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className={`bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-black/70 disabled:bg-black/30 ${
                                  !isUserFormValid ? "cursor-not-allowed" : ""
                                }`}
                                disabled={!isUserFormValid}
                                onClick={() => {
                                  setShowUserForm(false);
                                  setAcceptTerms(true);
                                }}
                              >
                                Next
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    {acceptTerms && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                          <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Select Payment Method
                          </h2>
                          <div className="space-y-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={isCodChecked}
                                onChange={(e) =>
                                  setIsCodChecked(e.target.checked)
                                }
                                className="h-4 w-4 border-gray-300 rounded focus:ring-black"
                              />
                              <span className="text-gray-600">
                                Cash on Delivery
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={isCodChecked}
                                onChange={(e) =>
                                  setIsCodChecked(e.target.checked)
                                }
                                className="h-4 w-4 border-gray-300 rounded focus:ring-black"
                              />
                              <span className="text-gray-600">
                                I accept the{" "}
                                <button
                                  className="text-blue-500 underline hover:text-blue-700"
                                  onClick={() =>
                                    alert(
                                      "Show full terms and conditions modal here"
                                    )
                                  }
                                >
                                  Terms and Conditions
                                </button>
                              </span>
                            </label>
                            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                              <h3 className="font-semibold mb-2">
                                Terms and Conditions:
                              </h3>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>All orders are subject to availability.</li>
                                <li>
                                  Cash on Delivery is the only payment method
                                  currently supported.
                                </li>
                                <li>
                                  Returns are accepted for defective or
                                  incorrect foods within 7 days of delivery.
                                </li>
                                <li>
                                  Prices may vary based on market conditions
                                  without prior notice.
                                </li>
                                <li>
                                  By placing an order, you agree to comply with
                                  our Privacy Policy and terms of service.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-between">
                            <button
                              className="border-red-500 border text-red-500 hover:text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                              onClick={() => setAcceptTerms(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-black/70 disabled:bg-black/30 disabled:cursor-not-allowed"
                              onClick={handleCheckout}
                              disabled={
                                !isCodChecked || !acceptTerms || isLoading
                              }
                            >
                              {isLoading ? "Processing..." : "Confirm"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <SignInButton>
                <div className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-black/70 text-center mt-2 duration-150 transition-all">
                  Sign in
                </div>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketPage;
