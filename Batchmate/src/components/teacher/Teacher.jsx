import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const Teacher = () => {
    return (

        <div className='mx-2 w-[60%] h-full bg-gray-100 rounded-lg flex justify-start items-center flex-shrink-0'>
            <div className='w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[22%]'>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[15px] h-[15px] rounded-[50%]'>
                            <img src="/images/dummy-user.png" alt="user-image" className='w-full h-full' />
                        </div>
                        <p className='font-bold text-[11px] w-[80%] overflow-x-scroll text-nowrap'>Hanish Kumar</p>
                    </div>

                    <div className='flex justify-start items-center gap-1'>
                        <FaStar stroke='black' strokeWidth="50px" fill='gold' size="11px" />
                        <FaStar stroke='black' strokeWidth="50px" fill='gold' size="11px" />
                        <FaStar stroke='black' strokeWidth="50px" fill='gold' size="11px" />
                        <FaStar stroke='black' strokeWidth="50px" fill='gold' size="11px" />
                        <FaStarHalf stroke='black' strokeWidth="50px" fill='gold' size="11px" />
                    </div>

                </div>

                {/* review details */}
                <div>
                    <p>150 Reviews</p>
                    <p>Good Feedbacks</p>
                </div>



            </div>

        </div>
    )
}

export default Teacher