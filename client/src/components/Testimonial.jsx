import React from 'react'

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center pt-10!'>
        <h2 className='text-3xl font-bold text-center'>What Our Customers Say</h2>
        <p className='text-center text-gray-600 mt-2'>Hear from our satisfied customers about their experience with our products.</p>
        <div className='flex flex-col md:flex-row gap-6 mt-8!'>
            <div className='bg-[#222] p-6! rounded-lg shadow-md'>
                <p className='text-gray-800 italic'>"I absolutely love my new watch! The quality is outstanding and it looks amazing on my wrist. Highly recommend!"</p>
                <h4 className='mt-4 font-bold'>- Sarah M.</h4>
            </div>
            <div className='bg-[#222] p-6! rounded-lg shadow-md'>
                <p className='text-gray-800 italic'>"The customer service was fantastic. They helped me choose the perfect watch and it arrived quickly. I'm very happy with my purchase!"</p>
                <h4 className='mt-4 font-bold'>- John D.</h4>
            </div>
            <div className='bg-[#222] p-6! rounded-lg shadow-md'>
                <p className='text-gray-800 italic'>"I've received so many compliments on my watch. It's stylish, comfortable, and keeps perfect time. I couldn't be happier!"</p>
                <h4 className='mt-4 font-bold'>- Emily R.</h4>
            </div>
        </div>
    </div>
  )
}

export default Testimonial
