import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const AddFeedback = () => {
    const [rating, setRating] = useState(1)
    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen w-screen'>
                <form action="" className='flex flex-col gap-5 items-start h-screen justify-center w-full *:w-5/6 *:self-center'>
                    <h2 className='text-3xl font-bold '>Write Feedback 👏</h2>
                    <Rating style={{ maxWidth: 230,  }} value={rating} onChange={setRating} itemStyles={{ itemShapes: StickerStar, activeFillColor: '#ffb700', inactiveFillColor: '#fbf990' }} />
                    <textarea className='bg-gray-200 rounded-xl p-2 focus:outline-none focus:border-none shadow-md hover:bg-gray-300 transition-colors' name="" id="" cols="30" rows="7" placeholder='I would like to say...'></textarea>
                    <input className='bg-blue-300 rounded-xl p-3 px-5 text-white shadow-md font-bold hover:shadow-xl hover:bg-blue-500 transition-all' type="submit" value="Submit" />
                </form>
            </div>

        </>
    )
}

export default AddFeedback