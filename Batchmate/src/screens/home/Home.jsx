import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feedback, { FeedbackLoader } from '../../components/feedback/Feedback';
import { BsPatchPlusFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import Teacher from '../../components/teacher/Teacher';

const Home = () => {
    return (
        <>
            <Navbar />
            <main>

                <section>
                    <h2 className='text-center my-1 text-sm font-bold'>Latest Feedbacks</h2>

                    <div className='w-screen h-[20vh] overflow-x-scroll flex flex-no-wrap'>
                        <Feedback />
                        <Feedback />
                        <Feedback />
                    </div>
                </section>


                <section>
                    <h2 className='text-center my-1 mt-2 text-sm font-bold'>Popular Teachers</h2>

                    <div className='w-screen h-[10vh] overflow-x-scroll flex flex-no-wrap'>
                        <Teacher />
                    </div>

                </section>



                {/* floating button */}
                <button className='absolute bottom-6 right-4 flex justify-center items-center bg-none border-none w-fit h-fit rounded-full'>
                    <BsPatchPlusFill size="45px" fill='blue' />
                </button>
            </main>
        </>
    )
}
export default Home