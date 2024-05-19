import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import DevelopersData from './DevelopersData';

const Developers = () => {
    return (
        <>
            <Navbar />
            <h1 className='text-2xl p-1 font-extrabold text-center bg-orange-400 rounded-3xl m-3 shadow-md mt-[6.5vh]'>Meet Our Team</h1>
            <div className='w-full h-[85vh] flex flex-col flex-wrap  gap-1 justify-start items-center overflow-hidden'>
                <DevelopersData name="HANISH" role="Developer" insta="its_haniish" linkedin="its-hanish" twitter="its_haniish" />
                <DevelopersData name="NAMAN" role="Developer" insta="pankha.hu" linkedin="programmerxd" twitter="dotpxd" />
                <DevelopersData name="JASIKA" role="Designer" insta="its_jasika72" />
                <DevelopersData name="HEMLATA" role="Designer" insta="sigma_girl_100000001" />
            </div>
        </>
    );
};

export default Developers;
