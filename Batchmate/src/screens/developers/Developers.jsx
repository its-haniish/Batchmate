import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import DevelopersData from './DevelopersData';

const Developers = () => {
    return (
        <>
            <Navbar />
            <h1 className='text-2xl p-1 font-extrabold text-center bg-orange-400 rounded-3xl m-3 shadow-md'>Meet Our Team</h1>
            <div className='w-screen h-screen p-3 flex gap-3 justify-evenly flex-wrap'>
                <DevelopersData name="HANISH" role="Developer" insta="its_haniish" linkedin="its-hanish" twitter="its.haniish_" />
                <DevelopersData name="NAMAN" role="Developer" insta="pankha.hu" linkedin="programmerxd" twitter="dotpxd" />
                <DevelopersData name="JASIKA" role="Designer" insta="its.jasika72" />
                <DevelopersData name="HEMLATA" role="Designer" insta="sigma_girl_100000001" />
            </div>
        </>
    );
};

export default Developers;
