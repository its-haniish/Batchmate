import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import FeedbackForm from '../../components/feedback/FeedbackForm';

const AddFeedback = () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen w-screen'>
                <FeedbackForm />
            </div>

        </>
    )
}

export default AddFeedback