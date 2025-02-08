"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Chef } from "@/sanity/Types/schemasTypes";
import { getChef } from "@/sanity/lib/fetchquires/chef";

const ChefsList = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);

  useEffect(() => {
      async function fetchData() {
        const data = await getChef();
        setChefs(data);
      }
      fetchData();
    }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chefs.map((chef) => (
        <div key={chef._id} className="p-4 border rounded-lg shadow-md">
          {chef.image && (
            <Image
              src={chef.image.asset.url}
              alt={chef.name}
              width={200}
              height={200}  
              className="object-contain w-full h-48"
            />
          )}
          <h2 className="text-xl font-semibold">{chef.name}</h2>
          <p className="text-gray-600">{chef.bio}</p>
          <p className="text-sm text-gray-500">Experience: {chef.experience} years</p>
          <p className="text-sm text-gray-500">Country: {chef.country}</p>
          <p className="text-lg">{chef.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default ChefsList;
