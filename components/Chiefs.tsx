"use client";
import { fetchChiefs } from '@/sanity/lib/fetchquires/chief';
import { Chief } from '@/sanity/Types/schemasTypes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Chiefs = () => {
  const [chiefs, setChiefs] = useState<Chief[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getChiefs = async () => {
      const data = await fetchChiefs();
      setChiefs(data);
      setLoading(false);
    };

    getChiefs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {chiefs.map((chief) => (
        <div key={chief._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <Image
            width={500}
            height={500}
            src={chief.image?.asset?.url || '/default-image.jpg'}
            alt={chief.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{chief.name}</h3>
            <p className="text-sm text-gray-500">{chief.bio}</p>
            <p className="text-sm text-gray-600">Experience: {chief.experience} years</p>
            <p className="text-sm text-gray-600">Country: {chief.country}</p>
            <p className="text-sm text-gray-600">
              Rating: {chief.rating ? chief.rating.replace(/-/g, ' ') : 'No rating available'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chiefs;
