import React, { useState, useEffect } from 'react'
import { FaStar, FaStarHalf } from "react-icons/fa";
import FeedbackForm from '../feedback/FeedbackForm';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';
import { getTeacherInfo } from "../../utils/getTeacherInfo"
import Feedback from '../feedback/Feedback';


export const TeacherDetails = ({ name }) => {
    const { id } = useParams();
    const [teachInfo, setTeachInfo] = useState([]);


    useEffect(() => {
        getTeacherInfo(id, setTeachInfo)
    }, [])
    return (
        <>
            <Navbar />
            <div className='w-screen h-fit flex justify-start items-center'>
                <div className='w-full h-fit overflow-visible p-2 flex flex-col justify-start gap-1 items-center'>

                    <div className='w-full h-full mb-2 flex flex-col gap-2 justify-center'>
                        <div className='bg-gray-200 p-1 h-[40%] w-[70%] m-auto rounded-2xl '>
                            <img src={`${process.env.REACT_APP_BASE_URL}/images/${teachInfo.teacher?.name}.png`} alt={teachInfo.teacher?.name} className='w-[70%] h-full mx-auto' />
                        </div>

                        <div className='flex justify-between items-center w-full h-[12%]'>

                            <p className='font-bold text-[20px] w-[80%] overflow-x-hidden text-ellipsis whitespace-nowrap uppercase'>
                                {teachInfo.teacher?.name}
                            </p>

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
                        <p className='bg-orange-300 rounded-full p-1 text-center text-[20px] text-gray-900 font-Nunito font-bold'>{
                            `${teachInfo.feedbacks?.length} Feedbacks`
                        }</p>
                    </div>

                </div>
            </div>
            {/* write a review */}
            <div className='w-full h-full bg-gray-50 rounded-2xl py-2 overflow-visible'>
                <FeedbackForm />
            </div>
            {/* others review */}
            <div className='w-full h-full bg-gray-50 rounded-2xl py-2 overflow-visible my-2'>
                {
                    teachInfo.feedbacks?.length === 0 ? <p className='font-bold font-Nunito text-lg text-center'>!! No Feedbacks Found !!</p> :
                        teachInfo.feedbacks?.map(feedback => (
                            <Feedback />
                        ))
                }
            </div>

        </>
    )
}

export default TeacherDetails