import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feedback, { FeedbackLoader } from '../../components/feedback/Feedback';
import { MdOutlineAddToPhotos } from "react-icons/md";
import Teacher, { TeacherLoader } from '../../components/teacher/Teacher';
import { NavLink } from "react-router-dom"
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
    return (
        <>
            <Navbar />
            <main className='h-full py-1'>

                <section>
                    <h2 className='text-left pl-2 pt-1 my-1 text-2xl font-bold font-Nunito'>Popular Teachers</h2>

                    <div className='w-screen h-[45vh] overflow-x-scroll flex flex-no-wrap py-2 snap-mandatory snap-x'>
                        <Teacher />
                        <TeacherLoader />
                    </div>

                </section>

                <section className='py-2 h-[32vh]'>
                    <h2 className='text-left pl-2 pt-1 my-1 text-2xl font-bold font-Nunito'>Latest Feedbacks</h2>

                    <div className='w-screen h-[24vh] overflow-x-scroll flex flex-no-wrap py-2 snap-x'>
                        <Feedback />
                        <FeedbackLoader />
                    </div>
                </section>


                {/* floating button */}
                <NavLink to="write-feedback" className='w-12 h-12 fixed bottom-5 right-4 flex justify-center items-center border-none rounded-full bg-blue-600'>
                    <MdOutlineAddToPhotos size="30" fill='white' />
                </NavLink>

            </main>
        </>
    )
}
export default Home