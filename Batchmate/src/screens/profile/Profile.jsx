import React, { useState, useEffect, useLayoutEffect } from 'react'
import Navbar from '../../components/navbar/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiImageEditFill } from "react-icons/ri";
import styles from './profile.module.css';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineLogout } from "react-icons/md";
import { removeCookie } from '../../utils/cookies';
import { IoMdKey } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
    const { isUserLoggedIn, token } = useSelector(state => state.authReducer)
    const { image, name, email, rollNo } = useSelector(state => state.userDetailsReducer)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getTheUserData = async () => {
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/get-user-info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const parsedResp = await resp.json();

        dispatch({
            type: 'saveUserData',
            ...parsedResp
        })

    }

    useEffect(() => {

        if (!isUserLoggedIn) {
            navigate("/")
        }
        if (name === null || email === null || rollNo === null || image === null) {
            getTheUserData()
        }
    }, [])

    return (
        <>
            <Navbar />
            {/* <h1 className='text-4xl  px-2 my-4 font-extrabold'>Profile</h1> */}
            <div className='h-fit w-screen my-4 flex flex-row justify-around items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={image !== "" ? image : "/images/dummy-user.png"} alt={image !== "" ? image : "/images/dummy-user.png"} id={styles.userImage} className='h-28 w-28 rounded-full bg-red-500 ' />

                    <RiImageEditFill size={30} color='#fff' id={styles.editIcon} className='absolute' />
                </div>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold'>{name}</h2>
                    <div className='-rotate-6 my-4 h-fit shadow-md bg-gray-200  *:text-black'>
                        <h3 className='text-xl font-bold '>🔥 {'{num}'} Reviews</h3>
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center gap-3 px-2'>
                <button className='flex flex-row justify-center w-full text-md gap-1 items-center px-3 py-1 bg-gray-800 rounded-xl text-white font-bold self-center'> Edit Profile</button>
                <button className='flex flex-row justify-center w-full text-md gap-1 items-center px-3 py-1 bg-gray-800 rounded-xl text-white font-bold self-center'> Share Profile</button>
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
                    <input type="number" name="" id="" value={rollNo} placeholder='roll no.' readOnly />
                </div>
            </div>
            <div className='flex flex-col px-2 my-4 gap-2'>
                <h2 className='text-3xl font-extrabold'>Privacy & Security</h2>
                <hr />
                <div className='flex flex-row items-center gap-3'>
                    <h3 className='text-xl font-bold'>Email: </h3>
                    <textarea className='text-wrap w-max' type="email" name="" id="" value={email} placeholder='college name..' readOnly />
                </div>
            </div>
            <div className='flex flex-col px-2 my-4 gap-2'>
                <h2 className='text-3xl font-extrabold'>Danger Section</h2>
                <hr />
                <div className='flex flex-wrap gap-2 justify-between'>

                    <div className='flex flex-row items-center gap-3'>
                        <NavLink to="/forget-password" className='flex flex-row justify-center items-center px-3 py-2 bg-red-500 rounded-xl text-white font-bold self-center'><IoMdKey size={28} fill='#fff' color='#fff' /> Change Password</NavLink>
                    </div>

                    <div className='flex flex-row items-center gap-3'>
                        <button className='flex flex-row justify-center items-center px-3 py-2 bg-red-500 rounded-xl text-white font-bold self-center'
                            onClick={() => {
                                dispatch({
                                    type: "logoutUser"
                                })
                                removeCookie("batchmate")
                                console.log("Loggging out user...");
                                return navigate("/")
                            }}
                        ><MdOutlineLogout size={28} fill='#fff' color='#fff' /> LOGOUT</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile