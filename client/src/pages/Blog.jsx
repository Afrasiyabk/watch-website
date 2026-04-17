// src/pages/Blog.jsx
import React from "react";

export default function Blog() {

  const posts = [
    {
      title:"Top Luxury Watches 2026",
      desc:"Discover the most premium watches of this year.",
      img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      title:"How To Choose A Watch",
      desc:"Guide to choosing the perfect watch.",
      img:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
    },
    {
      title:"Classic vs Smart Watches",
      desc:"Which watch fits your lifestyle?",
      img:"https://images.unsplash.com/photo-1547996160-81dfa63595aa"
    },
  ];

  return (
    <div className='flex flex-col gap-10 p-5! md:p-8! lg:p-[70px]!'>

      <div>

        <h1 className="text-4xl font-bold text-center mb-14!">
          Watch Blog
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {posts.map((post,index)=>(
            <div key={index} className="bg-[#222] shadow rounded-xl overflow-hidden">

              <img src={post.img} className="h-56 w-full object-cover"/>

              <div className="p-6!">

                <h3 className="text-xl font-semibold mb-3!">
                  {post.title}
                </h3>

                <p className="text-gray-500 mb-5!">
                  {post.desc}
                </p>

                <button className="bg-amber-500 text-white px-6! py-2! rounded">
                  Read Article
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}