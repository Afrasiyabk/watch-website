// src/pages/Services.jsx
import React from "react";

export default function Services() {
  const services = [
    {title:"Free Shipping",desc:"Free worldwide delivery on all orders."},
    {title:"Luxury Warranty",desc:"All watches include a 2-year warranty."},
    {title:"Secure Payment",desc:"Encrypted checkout for safe transactions."},
    {title:"24/7 Support",desc:"Our team is ready to help anytime."},
    {title:"Premium Quality",desc:"Only authentic luxury watches."},
    {title:"Easy Returns",desc:"30-day easy return policy."},
  ];

  return (
    <div className='flex flex-col p-5! md:p-8! lg:p-[70px]!'>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center !mb-12">
          Our Services
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service,index)=>(
            <div key={index} className="bg-[#222] shadow-lg rounded-xl !p-8 text-center">

              <h3 className="text-xl font-semibold !mb-4">
                {service.title}
              </h3>

              <p className="text-gray-500">
                {service.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}