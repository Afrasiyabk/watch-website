// src/pages/Contact.jsx
import React from "react";

export default function Contact() {

  return (
    <div className='flex flex-col gap-10 p-5! md:p-8! lg:p-[70px]!'>

      <div>

        <h1 className="text-4xl font-bold text-center mb-12!">
          Contact Us
        </h1>

        <div className="bg-[#222] shadow-xl rounded-xl p-10!">

          <form className="grid gap-6">

            <input
              type="text"
              placeholder="Your Name"
              className="border rounded !p-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded !p-3"
            />

            <input
              type="text"
              placeholder="Subject"
              className="border rounded !p-3"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="border rounded !p-3"
            />

            <button className="bg-amber-500 text-white !py-3 rounded">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}