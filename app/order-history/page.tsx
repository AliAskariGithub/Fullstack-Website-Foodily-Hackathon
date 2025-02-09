import { Chakra_Petch } from 'next/font/google';
import React from 'react'

const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

const orderHistory = () => {
  return (
    <div className={`flex justify-center items-center h-screen text-4xl ${chakra_petch.className}`}>OrderHistory Page is Under Construction</div>
  )
}

export default orderHistory