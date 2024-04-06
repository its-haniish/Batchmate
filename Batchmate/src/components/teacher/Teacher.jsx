import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const Teacher = () => {
    return (

        <div className='mx-2 shadow-md w-[68vw] h-[100%] bg-gray-100 rounded-lg flex justify-start items-center flex-shrink-0 snap-center'>
            <div className='w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[12%]'>

                    <p className='font-bold text-[15px] w-[80%] overflow-x-hidden text-ellipsis whitespace-nowrap'>Hanish Kumar</p>

                    <div className='flex justify-start items-center gap-1'>
                        <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                        <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                        <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                        <FaStar stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                        <FaStarHalf stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                    </div>

                </div>

                {/* review details */}
                <div className='w-full h-[70%] mb-2 flex flex-col gap-2 justify-center'>
                    <div className='bg-gray-200 p-1 h-[70%] rounded-2xl '>
                        <img src="/images/dummy-teacher.png" alt="teacher" className='w-[70%] h-full mx-auto' />
                    </div>
                    <p className='bg-red-200 rounded-full p-1 text-center text-[20px] text-gray-900 font-bold font-Nunito'>150 Reviews</p>
                    <p className='bg-orange-300 rounded-full p-1 text-center text-[20px] text-gray-900 font-Nunito font-bold'>Good Feedbacks</p>
                </div>

                {/* Additional details */}
                <div className='w-full h-[18%] *:text-gray-900 *:overflow-x-hidden *:text-ellipsis *:whitespace-nowrap'>
                    <p><span className='font-bold'>Branch:</span> Computer Engineering</p>
                    <p><span className='font-bold'>College:</span> GDGP Hisar</p>
                </div>
            </div>

        </div>
    )
}



export const TeacherLoader = () => {
    return (

        <div className='mx-2 shadow-md w-[68vw] h-[100%] bg-gray-100 rounded-lg flex justify-start items-center flex-shrink-0 snap-center'>
            <div className='w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center animate-pulse'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[12%]'>


                    <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>


                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                    </div>

                </div>

                {/* review details */}
                <div className='w-full h-[70%] mb-2 flex flex-col gap-2 justify-center'>
                    <div className='bg-gray-200 p-1 h-[70%] rounded-2xl '>
                    </div>
                    <p className='bg-red-200 h-9 rounded-full p-1 text-center text-[20px] text-gray-900 font-medium animate-pulse'> </p>
                    <p className='bg-orange-300 h-9 rounded-full p-1 text-center text-[20px] text-gray-900 font-medium animate-pulse'> </p>
                </div>

                {/* Additional details */}
                <div className='w-full h-[18%] *:text-gray-900 *:overflow-x-hidden *:text-ellipsis *:whitespace-nowrap *:animate-pulse *:h-5 *:bg-gray-200 *:rounded '>
                    <p></p>
                    <p></p>
                </div>
            </div>

        </div>
    )
}

export default Teacher