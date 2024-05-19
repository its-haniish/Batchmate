import React, { useState, useEffect } from 'react'
import FeedbackForm from '../../components/feedback/FeedbackForm';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { getTeacherDetails } from "../../utils/getTeacherInfo"
import AllFeedbacks from './AllFeedbacks';
import { useDispatch, useSelector } from "react-redux"
import autoLogin from '../../utils/autoLogin';
import calculateAverageStars from "../../utils/calculateAverageStars";
import StarRating from '../../components/stars/StarRating';

export const TeacherDetails = () => {
    const { id } = useParams();
    const [isAutoLoginLoading, setIsAutoLoginLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [teachInfo, setTeachInfo] = useState([]);
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        getTeacherDetails(id, setTeachInfo, setLoading)
        autoLogin(isUserLoggedIn, dispatch, setIsAutoLoginLoading)
    }, [])
    return (
        <>
            <Navbar />
            {loading ? <TeacherDetailsLoader /> : <>
                <div className='w-screen h-fit flex justify-start items-center mt-[6vh]'>
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
                                    <StarRating rating={calculateAverageStars(teachInfo?.feedbacks || [])} />
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
                {
                    isUserLoggedIn &&
                    <div className='w-full h-full bg-gray-50 rounded-2xl py-2 overflow-visible'>
                        <FeedbackForm
                            teacherName={teachInfo.teacher?.name}
                            teacherId={teachInfo.teacher?._id} />
                    </div>
                }

                {/* others review */}
                <div className='w-full h-full bg-gray-50 rounded-2xl py-2 overflow-visible my-2 flex flex-col justify-start items-center gap-5'>
                    {
                        teachInfo.feedbacks?.length === 0 ? <p className='font-bold font-Nunito text-lg text-center'>!! No Feedbacks Found !!</p> :
                            teachInfo.feedbacks?.map(feedback => (
                                <AllFeedbacks key={feedback._id} message={feedback?.message} studentName={feedback?.studentName} stars={feedback?.stars} time={feedback?.time} />
                            ))
                    }
                </div>
            </>}

        </>
    )
}


export const TeacherDetailsLoader = () => {
    var defaultFeedbacksCount = [0, 1, 2, 3]
    return (
        <>
            <div className='w-screen h-fit flex justify-start items-center'>
                <div className='w-full h-fit overflow-visible p-2 flex flex-col justify-start gap-1 items-center'>

                    <div className='w-full h-full mb-2 flex flex-col gap-2 justify-center'>
                        <div className='bg-gray-200 animate-pulse p-1 h-[27vh] w-[70%] m-auto rounded-2xl '>
                        </div>

                        <div className='flex justify-between items-center w-full h-[12%]'>

                            <p className='font-bold text-[20px] h-[5vh] bg-gray-200 animate-pulse w-[100%] overflow-x-hidden text-ellipsis whitespace-nowrap uppercase'>
                            </p>

                            <div className='flex justify-start items-center gap-1'>
                            </div>

                        </div>

                        <div className='w-full h-fit *:text-gray-900 *:overflow-x-hidden *:text-ellipsis *:whitespace-nowrap'>
                            <p className='h-[2vh] w-[80%] animate-pulse bg-gray-200 mb-1'></p>
                            <p className='h-[2vh] w-[80%] animate-pulse bg-gray-200'></p>
                        </div>

                        {/* Additional details */}
                        <p className='bg-orange-300 rounded-full h-[4vh] animate-pulse p-1 text-center text-[20px] text-gray-900 font-Nunito font-bold'>{
                        }</p>
                    </div>

                </div>
            </div>
            {/* write a review */}
            {
                <div className='w-[95%] mx-auto h-[15vh] bg-gray-200 animate-pulse rounded-2xl py-2 overflow-visible'>
                </div>
            }

            {/* others review */}
            <div className='w-[95%] h-full rounded-2xl mx-auto overflow-visible my-2 flex flex-col justify-start items-center gap-2'>
                {
                    defaultFeedbacksCount.map(count => (
                        <div key={count} className='w-[95%] h-[7vh] bg-gray-200 animate-pulse rounded-2xl mx-auto overflow-visible my-1'></div>
                    ))
                }
            </div>

        </>
    )
}

export default TeacherDetails