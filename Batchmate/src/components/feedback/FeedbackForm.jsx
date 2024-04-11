
import React, { useState } from 'react';
import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export const FeedbackForm = () => {
    const [rating, setRating] = useState(1)
    return (

        <form action="" className='flex flex-col gap-5 items-start h-full justify-center w-full *:w-[95%] *:self-center'>
            <h2 className='text-3xl font-bold '>Write Feedback 👏</h2>
            <Rating style={{ maxWidth: 230, filter: 'drop-shadow(0 0 2px orange)'  }} value={rating} onChange={setRating} itemStyles={{ itemShapes: StickerStar, activeFillColor: '#ffb700', inactiveFillColor: '#fbf990' }} />
            <textarea className='bg-gray-200 rounded-xl p-2 focus:outline-none focus:border-none shadow-md hover:bg-gray-300 transition-colors' name="" id="" cols="30" rows="7" placeholder='I would like to say...'></textarea>
            <input className='bg-blue-300 rounded-xl p-3 px-5 text-white shadow-md font-bold hover:shadow-xl hover:bg-blue-500 transition-all' type="submit" value="Submit" />
        </form>
    )
}

export default FeedbackForm