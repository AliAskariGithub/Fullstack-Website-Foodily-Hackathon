// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Cinzel, Chakra_Petch } from 'next/font/google';

// export interface Food {
//   _id?: string;
//   name: string;
//   slug: string;
//   price: number;
//   fakePrice: number;
//   image: string;
//   description: string;
//   category: string; // Assuming category ID as a string reference
//   chef: string; // Assuming chef ID as a string reference
//   tags: string[];
//   rating?: {
//     reviewerName: string;
//     reviewText: string;
//     rating: number;
//   }[];
//   discount?: number;
//   stockQuantity: number;
//   availability: boolean;
// }


// const cinzel = Cinzel({ weight: '800', subsets: ['latin'] });
// const chakraPetch = Chakra_Petch({ weight: '700', subsets: ['latin'] });

// export default function NewFoodPage() {
//   const [foods, setFoods] = useState<Food[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const { register, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     async function loadFoods() {
//       const response = await fetch('/api/foods');
//       const data = await response.json();
//       setFoods(data);
//     }
//     loadFoods();
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onSubmit = async (data: any) => {
//     await fetch('/api/add-food', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     setIsOpen(false);
//     reset();
//   };

//   return (
//     <div className="p-6 bg-[#f4d35e] min-h-screen">
//       <div className="flex justify-between mb-6">
//         <h1 className={`text-2xl font-bold ${cinzel.className}`}>Food Items</h1>
//         <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-[#8f613c] text-white rounded-lg hover:bg-[#e9b966]">New Food</button>
//       </div>
//       <table className="w-full border border-black">
//         <thead>
//           <tr className="bg-[#e9b966]">
//             <th className="p-2 border border-black">Name</th>
//             <th className="p-2 border border-black">Price</th>
//             <th className="p-2 border border-black">Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {foods.map((food) => (
//             <tr key={food._id} className="border border-black">
//               <td className="p-2 border border-black">{food.name}</td>
//               <td className="p-2 border border-black">${food.price}</td>
//               <td className="p-2 border border-black">{food.category}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className={`text-xl mb-4 ${chakraPetch.className}`}>Add New Food</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
//               <input {...register('name')} placeholder='Food Name' className='w-full p-2 border rounded-lg' />
//               <input {...register('slug')} placeholder='Slug' className='w-full p-2 border rounded-lg' />
//               <input {...register('price')} placeholder='Price' type='number' className='w-full p-2 border rounded-lg' />
//               <input {...register('fakePrice')} placeholder='Fake Price' type='number' className='w-full p-2 border rounded-lg' />
//               <input {...register('image')} placeholder='Image URL' className='w-full p-2 border rounded-lg' />
//               <textarea {...register('description')} placeholder='Description' className='w-full p-2 border rounded-lg'></textarea>
//               <input {...register('category')} placeholder='Category ID' className='w-full p-2 border rounded-lg' />
//               <input {...register('chiefs')} placeholder='Chief ID' className='w-full p-2 border rounded-lg' />
//               <input {...register('tags')} placeholder='Tags' className='w-full p-2 border rounded-lg' />
//               <input {...register('discount')} placeholder='Discount' type='number' className='w-full p-2 border rounded-lg' />
//               <input {...register('stockQuantity')} placeholder='Stock Quantity' type='number' className='w-full p-2 border rounded-lg' />
//               <input {...register('availability')} placeholder='Available (true/false)' className='w-full p-2 border rounded-lg' />
//               <div className="flex justify-between">
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add</button>
//                 <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>under construction</div>
  )
}

export default page