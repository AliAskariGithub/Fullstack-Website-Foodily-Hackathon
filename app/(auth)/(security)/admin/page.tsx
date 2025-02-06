"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Satisfy, Cinzel, Chakra_Petch, Caveat } from "next/font/google";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import Sidebar from "@/components/admin/Sidebar";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });
const caveat = Caveat({ weight: "600", subsets: ["latin"] });

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: { image: any; food: string; quantity: number; price: number }[];
  totalPrice: number;
  status: string;
  createdAt: string;
  timer: number;
  processingTime?: number;
}

const OrdersDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === validEmail && password === validPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };


  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await client.fetch('*[_type == "order"]');
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (
    orderId: string,
    newStatus: string,
    processingTime?: number
  ) => {
    try {
      await client
        .patch(orderId)
        .set({ status: newStatus, processingTime })
        .commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus, processingTime }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "processing" && order.processingTime) {
            const elapsedTime =
              (Date.now() - new Date(order.createdAt).getTime()) / 60000;
            if (elapsedTime >= order.processingTime) {
              updateOrderStatus(order._id, "shipped");
            }
          }
          return order;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [orders]);

  const deleteOrder = async (orderId: string) => {
    try {
      await client.delete(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchTerm
      ? order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesStatus = statusFilter ? order.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const getRowClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200";
      case "processing":
        return "bg-blue-100";
      case "shipped":
        return "bg-green-200";
      case "delivered":
        return "bg-red-200 line-through";
        return "";
    }
  };

  const orderStats = {
    newOrders: orders.filter((order) => order.status === "pending").length,
    processing: orders.filter((order) => order.status === "processing").length,
    shipped: orders.filter((order) => order.status === "shipped").length,
    totalOrders: orders.length,
    delivered: orders.filter((order) => order.status === "delivered").length,
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex justify-center items-center h-screen">
        <div className="bg-[#e9b966] p-8 rounded-md shadow-lg w-96">
          <h2
          className={`text-3xl font-semibold text-center text-[#8f613c] mb-6 ${chakra_petch.className}`}
        >
          Login
        </h2>
          <form onSubmit={handleLogin} className="space-y-4 flex flex-col justify-center items-center w-full">
            <div>
              <label
                htmlFor="email"
                className={`${caveat.className} block text-lg font-medium text-black/70`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
               className={`rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] w-80 opacity-100 ${satisfy.className}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`${caveat.className} block text-lg font-medium text-black/70`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
               className={`rounded px-3 py-1 transition-all mb-5 duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] w-80 opacity-100 ${satisfy.className}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full button-hover-effect-border rounded-full"
          >
            <span className={`${cinzel.className}`}>Login</span>
            </button>
          </form>
        </div>
        </div>
      ) : (
        <>
        <Sidebar />
        <div className="w-full h-full p-4 sm:p-6 relative">
          <div className="absolute top-3 sm:top-5 right-3 sm:right-5 flex items-center">
            <IoMdNotificationsOutline size={40} color="8f613c" />
            <span
              className={`bg-[#8f613c] absolute w-5 sm:w-6 h-5 sm:h-6 top-0 right-0 flex justify-center items-center rounded-full text-xs sm:text-sm text-white ${chakra_petch.className}`}
            >
              {orderStats.newOrders}
            </span>
          </div>

          <div className="absolute top-16 sm:top-20 left-4 sm:left-20 w-11/12 p-4 sm:p-6 rounded-xl">
            <div className="w-full mb-4 sm:mb-6 bg-[#8f613c] p-4 sm:p-6 rounded-xl flex justify-center">
              <h1
                className={`text-2xl sm:text-3xl text-white ${cinzel.className}`}
              >
                Admin Dashboard
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 sm:mb-6">
              {[
                "Total Orders",
                "Processing",
                "Shipped",
                "Orders Completed",
              ].map((title, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 bg-white rounded-2xl bg-gradient-to-bl hover:scale-105 border border-black text-[#8f613c] hover:text-[#6d4829] text-lg sm:text-xl cursor-pointer duration-200 transition from-[#8f613c] via-[#e9b966] to-[#8f613c] shadow-lg text-center font-bold ${chakra_petch.className}`}
                >
                  {title} <br /> <span>{Object.values(orderStats)[index]}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <select
                className="bg-[#f0d5a6] text-[#8f613c] font-semibold p-3 rounded-lg w-full sm:w-1/3 md:w-1/4 focus:outline-none focus:ring-4 focus:ring-[#8f613c] focus:ring-opacity-50 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="" className="text-gray-700">
                  All Statuses
                </option>
                <option value="pending" className="text-yellow-700">
                  Pending
                </option>
                <option value="processing" className="text-blue-700">
                  Processing
                </option>
                <option value="shipped" className="text-green-700">
                  Shipped
                </option>
                <option value="delivered" className="text-purple-700">
                  Delivered
                </option>
              </select>

              <div
                className={`flex items-center duration-300 transition-all pr-2 py-1 rounded-xl ${
                  isExpanded ? "bg-[#f0d5a6]" : "w-max"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`ml-2 rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] ${
                    isExpanded ? "w-48 md:w-72 opacity-100" : "w-0 opacity-0"
                  }`}
                />
                <FaSearch
                  onClick={toggleSearch}
                  size={24}
                  className="text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all cursor-pointer ml-2 mr-2"
                />
              </div>
            </div>

            {loading ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] bg-white border border-black rounded-lg">
                  <thead className="bg-[#e9b966] text-[#794e2b] text-sm sm:text-xl">
                    <tr>
                      {[
                        "S.No",
                        "Order ID",
                        "Customer",
                        "Email",
                        "Items",
                        "Phone",
                        "Total Price",
                        "Status",
                        "Actions",
                      ].map((heading, index) => (
                        <th
                          key={index}
                          className={`p-2 sm:p-3 border border-black ${chakra_petch.className}`}
                        >
                          <div className="skeleton-loader bg-gray-300 h-4 w-20 rounded-sm"></div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <tr
                            key={index}
                            className="text-center border border-white opacity-90 hover:opacity-100"
                          >
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-12 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-20 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-28 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-28 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-32 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-20 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-24 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-16 rounded-sm"></div>
                            </td>
                            <td className="p-2 sm:p-3 border">
                              <div className="skeleton-loader bg-gray-300 h-4 w-20 rounded-sm"></div>
                            </td>
                          </tr>
                        ))
                      : filteredOrders.map((order, index) => (
                          <tr
                            key={order._id}
                            className={`text-center border border-white hover:border-black opacity-90 hover:opacity-100 transition duration-200 ${getRowClass(order.status)}`}
                          >
                            <td className="p-2 sm:p-3 border">{index + 1}</td>
                            <td className="p-2 sm:p-3 border font-bold text-gray-700">
                              {order.orderId}
                            </td>
                            <td
                              className={`p-2 sm:p-3 border ${satisfy.className} text-gray-600`}
                            >
                              {order.customerName}
                            </td>
                            <td className="p-2 sm:p-3 border text-gray-600">
                              {order.customerEmail}
                            </td>
                            <td className="p-2 sm:p-3 border">
                              {order.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2"
                                >
                                  {item.image && (
                                    <Image
                                      src={item.image.asset.url}
                                      alt={item.food}
                                      width={40}
                                      height={40}
                                      className="rounded shadow-lg"
                                    />
                                  )}
                                  <span>
                                    {item.food} x {item.quantity}
                                  </span>
                                </div>
                              ))}
                            </td>
                            <td className="p-2 sm:p-3 border">{order.phone}</td>
                            <td className="p-2 sm:p-3 border text-green-600 font-bold">
                              Rs {order.totalPrice.toFixed(2)}
                            </td>
                            <td className="p-2 sm:p-3 border">
                              {order.status}
                            </td>
                            <td className="p-2 sm:p-3 border">
                              {order.status === "pending" && (
                                <button
                                  className="bg-blue-500 text-white p-2 rounded"
                                  onClick={() => {
                                    const time = prompt(
                                      "Enter preparation time (minutes):"
                                    );
                                    if (time)
                                      updateOrderStatus(
                                        order._id,
                                        "processing",
                                        parseInt(time)
                                      );
                                  }}
                                >
                                  Start
                                </button>
                              )}
                              {order.status === "processing" && (
                                <span
                                  className="text-black p-1 sm:p-2 rounded text-xs sm:text-sm"
                                  onClick={() =>
                                    updateOrderStatus(order._id, "delivered")
                                  }
                                >
                                  {order.processingTime} min left
                                </span>
                              )}
                              {order.status === "shipped" && (
                                <button
                                  className="bg-green-500 animate-bounce hover:bg-green-600 text-white p-1 sm:p-2 rounded text-xs sm:text-sm"
                                  onClick={() =>
                                    updateOrderStatus(order._id, "delivered")
                                  }
                                >
                                  Delivered
                                </button>
                              )}
                              {order.status === "delivered" && (
                                <button
                                  className="bg-red-500 hover:bg-red-600 text-white p-1 sm:p-2 rounded text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={
                                    Date.now() -
                                      new Date(order.createdAt).getTime() <
                                    7 * 24 * 60 * 60 * 1000
                                  }
                                  onClick={() => deleteOrder(order._id)}
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] bg-white border border-black rounded-lg">
                  <thead className="bg-[#e9b966] text-[#794e2b] text-sm sm:text-xl">
                    <tr>
                      {[
                        "S.No",
                        "Order ID",
                        "Customer",
                        "Email",
                        "Items",
                        "Phone",
                        "Total Price",
                        "Status",
                        "Actions",
                      ].map((heading, index) => (
                        <th
                          key={index}
                          className={`p-2 sm:p-3 border border-black ${chakra_petch.className}`}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={`text-center border border-white hover:border-black opacity-90 hover:opacity-100 transition duration-200 ${getRowClass(order.status)}`}
                      >
                        <td className="p-2 sm:p-3 border">{index + 1}</td>
                        <td className="p-2 sm:p-3 border font-bold text-gray-700">
                          {order.orderId}
                        </td>
                        <td
                          className={`p-2 sm:p-3 border ${satisfy.className} text-gray-600`}
                        >
                          {order.customerName}
                        </td>
                        <td className="p-2 sm:p-3 border text-gray-600">
                          {order.customerEmail}
                        </td>
                        <td className="p-2 sm:p-3 border">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              {item.image && (
                                <Image
                                  src={item.image.asset.url}
                                  alt={item.food}
                                  width={40}
                                  height={40}
                                  className="rounded shadow-lg"
                                />
                              )}
                              <span>
                                {item.food} x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="p-2 sm:p-3 border">{order.phone}</td>
                        <td className="p-2 sm:p-3 border text-green-600 font-bold">
                          Rs {order.totalPrice.toFixed(2)}
                        </td>
                        <td className="p-2 sm:p-3 border">{order.status}</td>
                        <td className="p-2 sm:p-3 border">
                          {order.status === "pending" && (
                            <button
                              className="bg-blue-500 text-white p-2 rounded"
                              onClick={() => {
                                const time = prompt(
                                  "Enter preparation time (minutes):"
                                );
                                if (time)
                                  updateOrderStatus(
                                    order._id,
                                    "processing",
                                    parseInt(time)
                                  );
                              }}
                            >
                              Start
                            </button>
                          )}
                          {order.status === "processing" && (
                            <span
                              className="text-black p-1 sm:p-2 rounded text-xs sm:text-sm"
                              onClick={() =>
                                updateOrderStatus(order._id, "delivered")
                              }
                            >
                              {order.processingTime} min left
                            </span>
                          )}
                          {order.status === "shipped" && (
                            <button
                              className="bg-green-500 animate-bounce hover:bg-green-600 text-white p-1 sm:p-2 rounded text-xs sm:text-sm"
                              onClick={() =>
                                updateOrderStatus(order._id, "delivered")
                              }
                            >
                              Delivered
                            </button>
                          )}
                          {order.status === "delivered" && (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white p-1 sm:p-2 rounded text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={
                                Date.now() -
                                  new Date(order.createdAt).getTime() <
                                7 * 24 * 60 * 60 * 1000
                              }
                              onClick={() => deleteOrder(order._id)}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-3 z-50">
          <button
            onClick={handleLogout}
            className="text-[#8f613c] p-2 rounded-full hover:scale-105 transition-transform duration-300 ease-in-out"
          ><CgLogOut size={30} />
          </button>
        </div>
        </>
      )}
    </>
  );
};

export default OrdersDashboard;
