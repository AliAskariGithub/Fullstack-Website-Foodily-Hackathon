// import Team from '@/components/Team'
// import React from 'react'

// const About = () => {
//   return (
//     <div className='flex justify-center items-center h-screen text-xl font-bold'>
//      <Team />
//     </div>
//   )
// }

// export default About

// app/about/page.tsx
'use client';

import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section className="bg-[#e1d3b6] min-h-screen flex flex-col items-center justify-center py-16 px-8">
      <div className="text-center space-y-12">
        {/* Hero Section */}
        <div className="animate__animated animate__fadeIn animate__delay-1s">
          <h1 className="text-5xl font-extrabold text-[#8f613c]">
            Welcome to Foodliy
          </h1>
          <p className="text-xl text-[#8f613c] mt-4">
            Where culinary art meets exceptional taste.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-2s">
          <h2 className="text-4xl text-[#e9b966] font-semibold">Our Story</h2>
          <p className="text-lg text-[#8f613c]">
            Foodliy was founded with one simple idea in mind: to create
            memorable dining experiences. What started as a small family-owned bistro
            has grown into a beloved establishment serving the freshest, most flavorful
            dishes in town. We believe food is an art form, and we take pride in
            every plate we serve.
          </p>
          <p className="text-lg text-[#8f613c]">
            From humble beginnings, we’ve honed our skills, sourced the best ingredients,
            and created an atmosphere that feels like home. Our team is passionate about
            delivering exceptional service and making every meal a celebration.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-3s">
          <h2 className="text-4xl text-[#e9b966] font-semibold">Our Core Values</h2>
          <ul className="list-disc list-inside text-lg text-[#8f613c] space-y-4">
            <li>Fresh and high-quality ingredients sourced locally.</li>
            <li>Sustainability and eco-friendly practices at every step.</li>
            <li>Customer satisfaction is at the heart of everything we do.</li>
            <li>Innovation and creativity in every dish we create.</li>
            <li>Respect for our staff, our community, and the environment.</li>
          </ul>
        </div>

        {/* Our Menu Section */}
        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-4s">
          <h2 className="text-4xl text-[#e9b966] font-semibold">Our Menu</h2>
          <p className="text-lg text-[#8f613c]">
            At Foodliy, we offer a diverse menu that caters to all tastes
            and dietary preferences. Whether you&apos;re craving something savory, sweet, or healthy,
            we&apos;ve got something for everyone. Our chefs use only the finest ingredients
            to create dishes that are as beautiful as they are delicious.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Example menu items */}
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
              <Image width={1000} height={1000} src="/images/dish1.jpg" alt="Dish 1" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold text-[#8f613c] mt-4">Grilled Salmon</h3>
              <p className="text-lg text-[#8f613c]">$19.99</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
              <Image width={1000} height={1000} src="/images/dish2.jpg" alt="Dish 2" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold text-[#8f613c] mt-4">Vegan Tacos</h3>
              <p className="text-lg text-[#8f613c]">$12.99</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
              <Image width={1000} height={1000} src="/images/dish3.jpg" alt="Dish 3" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold text-[#8f613c] mt-4">Pasta Primavera</h3>
              <p className="text-lg text-[#8f613c]">$15.99</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
              <Image width={1000} height={1000} src="/images/dish4.jpg" alt="Dish 4" className="w-full h-48 object-cover rounded-t-lg"/>
              <h3 className="text-xl font-semibold text-[#8f613c] mt-4">Chocolate Cake</h3>
              <p className="text-lg text-[#8f613c]">$6.99</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-5s">
          <h2 className="text-4xl text-[#e9b966] font-semibold">Why Choose Us?</h2>
          <p className="text-lg text-[#8f613c]">
            We take pride in offering a truly unique dining experience. Here&apos;s why our customers
            keep coming back:
          </p>
          <div className="space-y-4 text-left text-[#8f613c]">
            <ul className="list-disc list-inside">
              <li>Locally sourced and organic ingredients.</li>
              <li>Friendly and attentive service from our professional staff.</li>
              <li>Vibrant atmosphere with a welcoming environment for all.</li>
              <li>Innovative and ever-changing menu with seasonal specials.</li>
              <li>Customizable dishes to fit every dietary need and preference.</li>
            </ul>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-1s">
          <h2 className="text-4xl text-[#e9b966] font-semibold">What Our Customers Say</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-lg text-[#8f613c]">
                The best dining experience I&apos;ve ever had! The food is outstanding, and the service
                is impeccable. Highly recommend the grilled salmon and the vegan tacos!
              </p>
              <p className="text-right text-[#8f613c]">- Sarah L.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-lg text-[#8f613c]">
                I come here every weekend! The pasta primavera is my favorite, and the atmosphere
                is perfect for a date night. Can&apos;t wait to visit again!
              </p>
              <p className="text-right text-[#8f613c]">- James T.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="space-y-6 animate__animated animate__fadeIn animate__delay-7s">
          <h2 className="text-4xl text-[#e9b966] font-semibold">Join Us Today</h2>
          <p className="text-lg text-[#8f613c]">
            Ready to experience the best food in town? Visit us today and treat yourself to a meal
            that will leave you coming back for more. We look forward to serving you!
          </p>
          <a href="#reservation" className="text-xl text-[#e9b966] underline hover:text-[#8f613c]">
            Make a Reservation
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
