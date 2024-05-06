import React, { useEffect, useState, useLayoutEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feedback, { FeedbackLoader } from '../../components/feedback/Feedback';
import { MdOutlineAddToPhotos } from "react-icons/md";
import Teacher, { TeacherLoader } from '../../components/teacher/Teacher';
import { NavLink, useNavigate } from "react-router-dom"
import getTeachersList from "../../utils/getTeachersList.js"
import Sidebar from '../../components/sidebar/Sidebar';
import { toast } from 'react-toastify';
import autoLogin from '../../utils/autoLogin.js';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { getLatestFeedbacks } from '../../utils/getLatestFeedbacks.js';



const Home = () => {
    const [teachers, setTeachers] = useState([]);
    const [latestFeedbacks, setLatestFeedbacks] = useState([])
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch()


    useEffect(() => {
        getTeachersList(setTeachers)
        getLatestFeedbacks(setLatestFeedbacks)
    }, [])

    useLayoutEffect(() => {
        autoLogin(isUserLoggedIn, dispatch)
    }, [])

    return (
        <>
            <Navbar />
            <main className='h-full py-1'>

                <section>
                    <h2 className='text-left pl-2 pt-1 my-1 text-2xl font-bold font-Nunito'>Popular Teachers</h2>

                    <div className='w-screen h-[45vh] overflow-x-scroll flex flex-no-wrap py-2 *:px-1 snap-mandatory snap-x'>
                        {
                            teachers.length === 0 ?
                                <>
                                    <TeacherLoader />
                                    <TeacherLoader />
                                    <TeacherLoader />
                                    <TeacherLoader />
                                </> :
                                teachers.map(teacher => {
                                    const { name, _id } = teacher;
                                    return (
                                        <Teacher key={_id} id={_id}     name={name} />
                                    )
                                })
                        }
                    </div>

                </section>

                <section className='py-2 h-[32vh]'>
                    <h2 className='text-left pl-2 pt-1 my-1 text-2xl font-bold font-Nunito'>Latest Feedbacks</h2>

                    <div className='w-screen h-[24vh] overflow-x-scroll flex flex-no-wrap py-2 snap-x'>
                        {
                            latestFeedbacks.length === 0 ?
                                <>
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />
                                    <FeedbackLoader />

                                </> :
                                latestFeedbacks?.map(feedback => {
                                    const { message, teacherName, teacherId, studentName, studentId, stars, time, _id } = feedback
                                    return (
                                        <Feedback
                                            key={_id}
                                            message={message}
                                            teacherName={teacherName}
                                            teacherId={teacherId}
                                            studentName={studentName}
                                            studentId={studentId}
                                            stars={stars}
                                            time={time} />
                                    )
                                })
                        }
                    </div>
                </section>


                {/* floating button */}
                <button onClick={() => {
                    isUserLoggedIn ? navigate("/write-feedback") : toast.error("Login to write a feedback.")
                }} className='w-12 h-12 fixed bottom-5 right-4 flex justify-center items-center border-none rounded-full bg-blue-600'>
                    <MdOutlineAddToPhotos size="30" fill='white' />
                </button>

            </main>
        </>
    )
}
export default Home