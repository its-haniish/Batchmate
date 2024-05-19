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
    const { image, name, email, rollNo, feedbacks, _id } = useSelector(state => state.userDetailsReducer);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({ name: "", image: "" });

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
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file to state
        const image = URL.createObjectURL(e.target.files[0]);
        setData({ ...data, image })
    };


    const handleUpdateProfile = async () => {
        setLoading(true)

        try {

            if (data.name !== name) {
                await fetch(`${process.env.REACT_APP_BASE_URL}/update-user-info`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: data.name })
                })
                    .then(res => res.json())
                    .then(result => {

                        if (result.message === "Profile updated successfully.") {
                            dispatch({
                                type: 'updateName',
                                name: data.name
                            })
                            if (file !== null) {
                                uploadImage(file)
                            } else {
                                toast.success("Profile updated successfully.")
                            }
                        } else {
                            if (file !== null) {
                                uploadImage(file)
                            } else {
                                toast.error("Error updating profile. Please try again.")
                            }
                        }
                        setLoading(false)
                        setEditMode(false)

                    })
            } else {
                if (file !== null) {
                    uploadImage(file)
                }
            }

        } catch (error) {
            setEditMode(false)
            setLoading(false)
            console.log(error);
        }
    }

    const uploadImage = async (file) => {
        const formData = new FormData(); // Create a new FormData object
        formData.append("image", file); // Append the file to FormData with key "image"
        try {
            // Send a POST request to localhost:8080/save with the form data using fetch
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/save-image`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const result = await response.json(); // Parse the response JSON
            if (result.message === "Image uploaded successfully.") {
                const imageExtension = file.name.split('.').pop();
                dispatch({
                    type: 'updateImage',
                    image: `${_id}.${imageExtension}`
                })
                toast.success("Profile updated successfully. Restart app if image is not updated.")
            } else {
                toast.error("Error uploading image. Please try again.")
            }
            setLoading(false)
            setEditMode(false)
        } catch (error) {
            setLoading(false)
            toast.error("Error uploading image. Please try again.")
            console.error("Error:", error); // Log any errors that occur
        }

    }

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/");
        } else {
            setData({ name, image })
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

                            <div className='img-wrapper'>
                                <img src={data?.image === "" ? "/images/dummy-user.png" : data.image !== image ? data.image : `${process.env.REACT_APP_BASE_URL}/images/${data?.image}`} alt="profile picture" />
                                <div className='input-wrapper'>
                                    <input type="file" name="profile-pic" id="profile-pic" onChange={handleFileChange} />
                                    <RiImageEditFill size={40} color='white' fill='white' />
                                </div>
                            </div>

                            <input
                                type="text"
                                name="name"
                                value={data?.name}
                                placeholder="Name"
                                className='w-[70%] h-fit rounded-md outline-none border border-black p-1 font-medium text-2xl text-center' onChange={handleChange} />

                            <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center' onClick={!loading ? handleUpdateProfile : () => toast.info("Please wait...")} >
                                {!loading ? "UPDATE" : <RotatingLines height="30" width="30" strokeColor='white' />}
                            </button>
                        </div>

                    </div>
                </>
                :
                <>
                    <div className='h-fit w-screen my-4 pl-3 flex flex-row justify-around items-center mt-[6.5vh]'>
                        <div className='flex flex-col w-[30vw] relative items-center justify-center rounded-full'>
                            <img src={image !== "" ? `${process.env.REACT_APP_BASE_URL}/images/${image}` : "/images/dummy-user.png"} className={`h-[30vw] overflow-hidden w-[30vw] rounded-[50%] bg-red-500`} alt={image !== "" ? image : "/images/dummy-user.png"} />
                        </div>
                        <div className='text-center w-[70vw] px-10 z-1'>
                            <textarea className={`text-3xl font-extrabold h-fit overflow-hidden line-clamp-2 w-[55vw] rounded-xl p-2 outline-none`} type='text' value={data?.name || ""} placeholder='Your name' readOnly />
                            <div className='-rotate-6 mb-4 -mt-4 h-fit shadow-md bg-gray-200  *:text-black'>
                                <h3 className='text-xl font-bold '>🔥 {`{${feedbacks.length || 0}}`} Reviews</h3>
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
                        <h2 className='text-3xl font-extrabold overflow-hidden'>General</h2>
                        <hr />
                        <div className='flex flex-row items-center gap-3'>
                            <h3 className='text-xl font-bold'>College: </h3>
                            <textarea className='text-wrap outline-none border-none' type="text" value={'Guru Daksh Government Polytechnic'} placeholder='college name..' draggable="false" style={{ resize: "none" }} readOnly />
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