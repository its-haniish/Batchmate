import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import { RiImageEditFill } from "react-icons/ri";
import styles from './profile.module.css'

const Profile = () => {
    return (
        <>
            <Navbar />
            {/* <h1 className='text-4xl  px-2 my-4 font-extrabold'>Profile</h1> */}
            <div className='h-fit w-screen my-4 flex flex-row justify-around items-center'>
                <div className='flex flex-col items-center justify-center'>
                <img src="" alt="" id={styles.userImage} className='h-28 w-28 rounded-full bg-red-500 ' />
                <RiImageEditFill size={30} color='#fff' id={styles.editIcon} className='absolute' />
                </div>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold'>Naman Saini</h2>
                    <h3 className='text-2xl font-bold text-gray-700'>Student</h3>
                </div>
            </div>
            <div className='flex flex-col px-2 my-4 gap-2'>
                <h2 className='text-3xl font-extrabold'>General</h2>
                <hr />
                <div className='flex flex-row items-center gap-3'>
                    <h3 className='text-xl font-bold'>College: </h3>
                    <textarea className='text-wrap' type="text" name="" id="" value={'Guru Daksh Government Polytechnic'} placeholder='college name..' readOnly />
                </div>
                <div className='flex flex-row items-center gap-3'>
                    <h3 className='text-xl font-bold'>Branch: </h3>
                    <input type="text" value={'Computer Engineering'} placeholder='branch name..' readOnly />
                </div>
                <div className='flex flex-row items-center gap-3'>
                    <h3 className='text-xl font-bold'>Roll no: </h3>
                    <input type="number" name="" id="" value={'210040800067'} placeholder='roll no..' readOnly />
                </div>
            </div>
            <div className='flex flex-col px-2 my-4 gap-2'>
                <h2 className='text-3xl font-extrabold'>Privacy & Security</h2>
                <hr />
                <div className='flex flex-row items-center gap-3'>
                    <h3 className='text-xl font-bold'>Email: </h3>
                    <textarea className='text-wrap w-max' type="email" name="" id="" value={'thisisnamansaini@gmail.com'} placeholder='college name..' readOnly />
                </div>
            </div>
            <div className='flex flex-col px-2 my-4 gap-2'>
                <h2 className='text-3xl font-extrabold'>Danger Section</h2>
                <hr />
                <div className='flex flex-row items-center gap-3'>
                    <button className='px-3 py-2 bg-red-500 rounded-xl text-white font-bold self-center'>Change Password</button>
                </div>
            </div>

        </>
    )
}

export default Profile