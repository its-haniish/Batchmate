import React from 'react'
import { FaStar, FaStarHalf } from "react-icons/fa";
import FeedbackForm from '../feedback/FeedbackForm';
import Navbar from '../navbar/Navbar';

export const TeacherDetails = () => {

    return (
        <>
            <Navbar />
            <div className='w-screen h-fit flex justify-start items-center'>
                <div className='w-full h-fit overflow-visible p-2 flex flex-col justify-start gap-1 items-center'>

                    <div className='w-full h-full mb-2 flex flex-col gap-2 justify-center'>
                        <div className='bg-gray-200 p-1 h-[40%] w-[70%] m-auto rounded-2xl '>
                            <img src="/images/dummy-teacher.png" alt="teacher" className='w-[70%] h-full mx-auto' />
                        </div>

                        <div className='flex justify-between items-center w-full h-[12%]'>

                            <p className='font-bold text-[20px] w-[80%] overflow-x-hidden text-ellipsis whitespace-nowrap'>Hanish Kumar</p>

                            <div className='flex justify-start items-center gap-1'>
                                <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="20px" />
                                <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="20px" />
                                <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="20px" />
                                <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="20px" />
                                <FaStarHalf stroke='gray' strokeWidth="50px" fill='gold' size="20px" />
                            </div>

                        </div>

                        <div className='w-full h-fit *:text-gray-900 *:overflow-x-hidden *:text-ellipsis *:whitespace-nowrap'>
                            <p><span className='font-bold'>Branch:</span> Computer Engineering</p>
                            <p><span className='font-bold'>College:</span> GDGP Hisar</p>
                        </div>

                        {/* Additional details */}
                        <p className='bg-red-200 rounded-full p-1 text-center text-[20px] text-gray-900 font-bold font-Nunito'>150 Reviews</p>
                        <p className='bg-orange-300 rounded-full p-1 text-center text-[20px] text-gray-900 font-Nunito font-bold'>Good Feedbacks</p>
                    </div>

                </div>
            </div>
            {/* others review */}
            <div className='w-full h-full bg-gray-50 rounded-2xl py-2 overflow-visible my-2'>
                <p>Reviews</p>
            </div>
            {/* write a review */}
            <div className='w-full h-full bg-gray-50 rounded-2xl py-2 overflow-visible'>
                <FeedbackForm />
            </div>
        </>
    )
}

export default TeacherDetails