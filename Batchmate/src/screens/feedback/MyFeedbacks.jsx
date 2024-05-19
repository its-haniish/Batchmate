import React, { useEffect, useState } from 'react'
import Feedback from '../../components/feedback/Feedback'
import { FeedbackLoader } from '../../components/feedback/Feedback';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from "react-redux"
import getFeedbackById from '../../utils/getFeedbackById';



const MyFeedbacks = () => {

    const [isFeedbacksLoading, setIsFeedbacksLoading] = useState(false);
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const [userFeedbacks, setUserFeedbacks] = useState([])
    const { feedbacks } = useSelector(state => state.userDetailsReducer)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn) return navigate("/")
        feedbacks.forEach(id => {
            getFeedbackById(id, setUserFeedbacks, setIsFeedbacksLoading)
        })
    }, [])


    return (
        <>
            <Navbar />
            <button onClick={() => navigate("/profile")} className="absolute top-16 left-3">
                <IoArrowBack size={30} color='black' />
            </button>
            <main className='py-2 overflow-y-scroll w-screen mt-[6.5vh]'>
                <h2 className='w-screen pl-2 pt-1 my-1 text-2xl text-center font-bold font-Nunito'>Your Feedbacks</h2>

                <div className='w-screen  flex flex-col items-center gap-2 justify-start overflow-y-scroll flex-no-wrap py-2 snap-x'>
                    {
                        isFeedbacksLoading ?
                            <>
                                <FeedbackLoader />
                                <FeedbackLoader />
                                <FeedbackLoader />
                                <FeedbackLoader />
                                <FeedbackLoader />

                            </> :
                            userFeedbacks.length === 0 ?
                                <p className='w-screen text-center font-normal font-Nunito'>!! THERE ARE NO FEEDBACKS TO SHOW !!</p> :
                                userFeedbacks?.map(feedback => {
                                    const { message, teacherName, teacherId, studentName, studentId, stars, time, _id, likes } = feedback
                                    return (
                                        <Feedback
                                            key={_id}
                                            id={_id}
                                            message={message}
                                            teacherName={teacherName}
                                            teacherId={teacherId}
                                            studentName={studentName}
                                            studentId={studentId}
                                            stars={stars}
                                            time={time}
                                            likes={likes}
                                        />
                                    )
                                })
                    }
                </div>
            </main>
        </>
    )
}

export default MyFeedbacks