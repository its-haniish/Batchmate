import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import DevelopersData from './DevelopersData';

const Developers = () => {
    return (
        <>
            <Navbar />
            <h1 className='text-2xl p-1 font-extrabold text-center bg-orange-400 rounded-3xl m-3 shadow-md'>Meet Our Team</h1>
            <div className='w-screen h-screen p-4 flex gap-4 justify-around flex-wrap'>
                <DevelopersData />
                <DevelopersData />
                <DevelopersData />
                <DevelopersData />
            </div>
        </>
    );
};

export default Developers;
