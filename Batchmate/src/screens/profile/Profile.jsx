"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeCookie } from '../../utils/cookies';
import { MdOutlineLogout } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { RiImageEditFill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner"
import { IoArrowBack } from "react-icons/io5";
import './Profile.css';



const Profile = () => {
    const { isUserLoggedIn, token } = useSelector(state => state.authReducer);
    const { image, name, email, rollNo } = useSelector(state => state.userDetailsReducer);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTheUserData = async () => {
        const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/get-user-info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const parsedResp = await resp.json();

        dispatch({
            type: 'saveUserData',
            ...parsedResp
        });
    };

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/");
        }
        if (name === null || email === null || rollNo === null || image === null) {
            getTheUserData();
        }
    }, []);

    return (
        <>
            <Navbar />
            {editMode ?
                <>

                    <button onClick={() => setEditMode(false)} className="absolute top-14 left-3">
                        <IoArrowBack size={30} color='black' />
                    </button>

                    <div className='h-fit w-screen'>

                        <h1 className='w-full text-center text-3xl font-bold mt-4'>Edit Profile</h1>

                        <div className='flex flex-col gap-4 justify-start items-center mt-5'>

                            <div className='img-wrapper'>
                                <img src="/images/dummy-user.png" alt="profile picture" />
                                <div className='input-wrapper'>
                                    <input type="file" name="profile-pic" id="profile-pic" />
                                    <RiImageEditFill size={40} color='white' fill='white' />
                                </div>
                            </div>

                            <input
                                type="text"
                                ame="name"
                                placeholder="Name"
                                className='w-[70%] h-fit rounded-md outline-none border border-black p-1 font-medium text-2xl text-center' />

                            <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center' onClick={() => setLoading(!loading)} >
                                {!loading ? "UPDATE" : <RotatingLines height="30" width="30" strokeColor='white' />}
                            </button>
                        </div>

                    </div>
                </>
                :
                <>
                    <div className='h-fit w-screen my-4 pl-3 flex flex-row justify-around items-center'>
                        <div className='flex flex-col w-[30vw] relative items-center justify-center rounded-full'>
                            <img src={image !== "" ? image : "/images/dummy-user.png"} className={`h-full w-full rounded-full bg-red-500`} alt={image !== "" ? image : "/images/dummy-user.png"} />
                        </div>
                        <div className='text-center w-[70vw] px-10'>
                            <textarea className={`text-3xl font-extrabold h-fit overflow-hidden line-clamp-2 w-[55vw] rounded-xl p-2 outline-none`} type='text' value={name || ""} placeholder='Your name' readOnly />
                            <div className='-rotate-6 mb-4 -mt-4 h-fit shadow-md bg-gray-200  *:text-black'>
                                <h3 className='text-xl font-bold '>🔥 {`{${20}}`} Reviews</h3>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-row justify-between items-center gap-3 px-2 mt-10`}>
                        <button className='flex flex-row justify-center w-full text-md gap-1 items-center px-3 py-1 bg-gray-800 rounded-xl text-white font-bold self-center' onClick={(e) => setEditMode(true)}>Edit Profile</button>
                        <button className='flex flex-row justify-center w-full text-md gap-1 items-center px-3 py-1 bg-gray-800 rounded-xl text-white font-bold self-center font-Nunito' onClick={() => {
                            toast.info("Feature coming soon!");
                        }}> Share Profile</button>
                    </div>

                    <div className='flex flex-col px-2 my-4 gap-2'>
                        <h2 className='text-3xl font-extrabold'>General</h2>
                        <hr />
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>College: </h3>
                            <textarea className='text-wrap outline-none border-none' type="text" value={'Guru Daksh Government Polytechnic'} placeholder='college name..' readOnly />
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>Branch: </h3>
                            <input type="text" value={'Computer Engineering'} placeholder='branch name..' readOnly />
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>Roll no: </h3>
                            <input type="number" name="" id="" value={rollNo || ""} placeholder='roll no.' readOnly />
                        </div>
                    </div>

                    <div className='flex flex-col px-2 my-4 gap-2'>
                        <h2 className='text-3xl font-extrabold'>Privacy & Security</h2>
                        <hr />
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>Email: </h3>
                            <input className='text-ellipsis outline-none w-[80%] border-none' type="email" name="" id="" value={email || ""} placeholder='college name..' readOnly />
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
                                        });
                                        removeCookie("batchmate");
                                        console.log("Logging out user...");
                                        return navigate("/");
                                    }}
                                ><MdOutlineLogout size={28} fill='#fff' color='#fff' /> LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Profile;