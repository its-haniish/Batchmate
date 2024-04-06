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
            <main className='h-full py-1'>

                <section>
                    <h2 className='text-left pl-2 pt-1 my-1 mt-3 text-2xl font-bold'>Popular Teachers</h2>

                    <div className='w-screen h-[45vh] overflow-x-scroll flex flex-no-wrap snap-x snap-mandatory py-2'>
                        <Teacher />
                        <Teacher />
                        <Teacher />
                    </div>

                </section>

                <section className='py-2 h-[32vh]'>
                    <h2 className='text-left pl-2 pt-1 my-1 mt-4 text-2xl font-bold'>Latest Feedbacks</h2>

                    <div className='w-screen h-[24vh] overflow-x-scroll flex flex-no-wrap snap-x snap-mandatory py-2'>
                        <Feedback />
                        <Feedback />
                        <Feedback />
                    </div>
                </section>





                {/* floating button */}
                <button className='fixed bottom-4 right-4 flex justify-center items-center bg-none border-none w-fit h-fit rounded-full'>
                    <BsPatchPlusFill size="55px" fill='blue' />
                </button>
            </main>
        </>
    )
}
export default Home