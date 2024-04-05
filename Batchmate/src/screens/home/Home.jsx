import React from 'react';

import Navbar from '../../components/navbar/Navbar';
import Feedback, { FeedbackLoader } from '../../components/feedback/Feedback';

const Home = () => {
    return (
        <>
            <Navbar />
            <main>

                <h2 className='text-center my-1 text-sm'>Latest Feedbacks</h2>

                <div className='w-screen h-[20vh] overflow-x-scroll flex flex-no-wrap'>
                    <FeedbackLoader />
                </div>



                {/* floating button */}
                <div>

                </div>
            </main>
        </>
    )
}
export default Home