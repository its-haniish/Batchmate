import React from 'react'

import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoShareAndroid } from "react-icons/go";

const Feedback = ({ message, teacherName, teacherId, studentName, studentId, stars, time }) => {
    const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos impedit dignissimos assumenda, optio blanditiis non est numquam exercitationem accusantium repellat, harum minima illo, at facilis iste pariatur laboriosam provident nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos impedit dignissimos assumenda, optio blanditiis non est numquam exercitationem accusantium repellat, harum minima illo, at facilis iste pariatur laboriosam provident nulla.";

    const truncatedText = text.substring(0, 150); // Extract first 280 characters
    const date = new Date(time).toLocaleString()
    const starArray = Array.from({ length: stars }, (_, index) => index + 1);
    return (
        <div className='w-[68vw] mx-2 h-[100%] rounded-lg flex justify-start items-center flex-shrink-0 gap-1 snap-center'>
            <div className='bg-gray-100 shadow-md  w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[23%]1'>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[22px] h-[22px] flex justify-center items-center'>
                            <img src="/images/dummy-user.png" alt="user-image" className='w-[20px] h-[20px] rounded-[50%]' />
                        </div>
                        <p className='font-bold text-[15px] w-[80%] overflow-x-hidden text-ellipsis whitespace-nowrap'>{studentName}</p>
                    </div>

                    <div className='flex justify-start items-center gap-1'>
                        {starArray.map((_, index) => (
                            <FaStar key={index} stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                        ))}
                    </div>

                </div>

                {/* feedback message */}
                <p className='h-[70%] w-full px-2 text-[14px] font-normal text-gray-900 text-justify line-clamp-5 text-ellipsis text-balance'>
                    {message}
                </p>

                {/* feedback target details */}
                <div className='flex justify-between items-center w-full h-[18%] py-1'>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='flex justify-center items-center'>
                            <img src={`${process.env.REACT_APP_BASE_URL}/images/${teacherName}.png`} alt={teacherName} className='w-[20px] h-[20px] rounded-[50%] border border-black' />
                        </div>
                        <p className='font-bold text-[14px] w-[80%] overflow-x-hidden text-ellipsis whitespace-nowrap uppercase'>{teacherName}</p>

                    </div>

                    <p className='text-black text-[10px] font-bold text-nowrap overflow-x-scroll'>{date}</p>
                </div>

            </div>
            <div className='flex flex-col justify-start gap-4 items-center w-[10%] h-full'>
                <BiLike size={24} />
                <BiSolidLike size={24} fill='red' color='red'  />
                <GoShareAndroid size={24} />
            </div>
        </div>
    )
}

export const FeedbackLoader = () => {
    return (
        <section className='bg-gray-100 shadow w-[68vw] mx-2 h-[100%] rounded-lg flex justify-start items-center flex-shrink-0 animate-pulse'>
            <div className='w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[16%]'>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[15px] h-[15px] rounded-[50%] animate-pulse bg-slate-200 '>
                        </div>
                        <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>
                    </div>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                    </div>

                </div>

                {/* feedback message */}
                <p className='h-[70%] w-full text-[11px] font-semibold bg-slate-200 animate-pulse rounded'>

                </p>

                {/* feedback target details */}
                <div className='flex justify-between items-center w-full h-[16%] '>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[15px] h-[15px] rounded-[50%] animate-pulse bg-slate-200'>
                        </div>
                        <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>
                    </div>
                    <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>

                </div>

            </div>
        </section>
    )
}

export default Feedback;