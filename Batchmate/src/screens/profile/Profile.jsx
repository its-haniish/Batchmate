"use client";
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
    const { image, name, email, rollNo, feedbacks, _id, imageString } = useSelector(state => state.userDetailsReducer);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newName, setNewName] = useState(null);

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

    const handleChange = e => {
        setNewName(e.target.value);
    }

    const readFileAsUrl = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        if (!allowedExtensions.includes(fileExtension)) {
            toast.error("Invalid file format. Please upload a valid image file.");
            setLoading(false);
            return;
        }

        const imageUrl = await uploadImage(file);
        const base64String = await readFileAsUrl(file);
        if (imageUrl) {
            dispatch({
                type: 'updateImage',
                image: imageUrl,
                imageString: base64String
            });
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setLoading(true);

        try {
            if (newName !== name) {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/update-user-info`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: newName })
                });

                const result = await response.json();

                if (result.message === "Profile updated successfully.") {
                    dispatch({
                        type: 'updateName',
                        name: newName
                    });
                    toast.success("Profile updated successfully.");
                    setEditMode(false);
                } else {
                    toast.error("Error updating profile. Please try again.");
                }
            }
        } catch (error) {
            toast.error("Error updating profile. Please try again.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/save-image`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const result = await response.json();
            if (result.message === "Image uploaded successfully.") {
                toast.success("Image uploaded successfully.");
                return `${_id}.${file.name.split('.').pop()}`;
            } else {
                toast.error("Error uploading image. Please try again.");
                return null;
            }
        } catch (error) {
            toast.error("Error uploading image. Please try again.");
            console.error("Error:", error);
            return null;
        }
    };

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/");
        } else {
            setNewName(name);
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
                    <button onClick={() => setEditMode(false)} className="absolute top-16 left-3">
                        <IoArrowBack size={30} color='black' />
                    </button>

                    <div className='h-fit w-screen mt-[6vh]'>
                        <h1 className='w-full text-center text-3xl font-bold mt-4 '>Edit Profile</h1>
                        <div className='flex flex-col gap-4 justify-start items-center mt-5'>
                            <div className='img-wrapper overflow-hidden'>
                                <img src={imageString ? imageString : !image ? "/images/dummy-user.png" : `${process.env.REACT_APP_BASE_URL}/images/${image}`} alt="profile picture" />
                                <div className='input-wrapper overflow-hidden'>
                                    <input type="file" name="profile-pic" id="profile-pic" onChange={handleFileChange} />
                                    <RiImageEditFill size={40} color='white' fill='white' />
                                </div>
                            </div>

                            <input
                                type="text"
                                name="name"
                                value={newName}
                                placeholder="Name"
                                className='w-[70%] h-fit rounded-md outline-none border border-black p-1 font-medium text-2xl text-center'
                                onChange={handleChange}
                            />

                            <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center'
                                onClick={!loading ? handleUpdateProfile : () => toast.info("Please wait...")} >
                                {!loading ? "UPDATE" : <RotatingLines height="30" width="30" strokeColor='white' />}
                            </button>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='h-fit w-screen my-4 pl-3 flex flex-row justify-around items-center mt-[6.5vh]'>
                        <div className='flex flex-col w-[30vw] relative items-center justify-center rounded-full'>
                            <img src={imageString ? imageString : image ? `${process.env.REACT_APP_BASE_URL}/images/${image}` : "/images/dummy-user.png"} className={`h-[30vw] overflow-hidden object-cover w-[30vw] rounded-[50%] bg-none`} alt={image !== "" ? image : "/images/dummy-user.png"} />
                        </div>
                        <div className='text-center w-[70vw] px-10 z-1'>
                            <textarea className={`text-3xl font-extrabold h-fit overflow-hidden line-clamp-2 w-[55vw] rounded-xl p-2 outline-none`} type='text' value={newName || ""} placeholder='Your name' readOnly />
                            <button className='-rotate-6 mb-4 -mt-4 h-fit shadow-md bg-gray-200  *:text-black' onClick={() => navigate('/feedbacks')}>
                                <h3 className='text-xl font-bold '>🔥 {`{${feedbacks.length || 0}}`} Reviews</h3>
                            </button>
                        </div>
                    </div>

                    <div className={`flex flex-row justify-between items-center gap-3 px-2 mt-10`}>
                        <button className='flex flex-row justify-center w-full text-md gap-1 items-center px-3 py-1 bg-gray-800 rounded-xl text-white font-bold self-center' onClick={(e) => setEditMode(true)}>Edit Profile</button>
                        <button className='flex flex-row justify-center w-full text-md gap-1 items-center px-3 py-1 bg-gray-800 rounded-xl text-white font-bold self-center font-Nunito' onClick={() => {
                            toast.info("Feature coming soon!");
                        }}> Share Profile</button>
                    </div>

                    <div className='flex flex-col px-2 my-4 gap-2'>
                        <h2 className='text-3xl font-extrabold overflow-hidden'>General</h2>
                        <hr />
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>College: </h3>
                            <textarea className='text-wrap outline-none border-none w-[50vw]' type="text" value={'Guru Daksh Government Polytechnic'} placeholder='college name..' draggable="false" style={{ resize: "none" }} readOnly />
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
                        <h2 className='text-3xl font-extrabold overflow-hidden'>Privacy & Security</h2>
                        <hr />
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>Email: </h3>
                            <input className='text-ellipsis outline-none w-[80%] border-none' type="email" name="" id="" value={email || ""} placeholder='college name..' readOnly />
                        </div>
                    </div>

                    <div className='flex flex-col px-2 my-4 gap-2'>
                        <h2 className='text-3xl font-extrabold overflow-hidden'>Danger Section</h2>
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
                                        dispatch({
                                            type: "deleteUserData"
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