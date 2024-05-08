import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { setCookie } from "../../utils/cookies.js"
import { IoArrowBack } from "react-icons/io5";


const Signup = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [otp] = useState(Math.floor(Math.random() * 1000000));
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [showCurrPass, setShowCurrPass] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSendOtp = async e => {
        e.preventDefault();
        setLoading(true)
        const { name, email, password, cpassword } = formData;

        if (name === "" || email === "" || password === "" || cpassword === "") {
            setLoading(false);
            return toast.error("All fields are required.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLoading(false);
            return toast.error("Invalid email address.");
        }

        if (password !== cpassword) {
            setLoading(false)
            return toast.error("Passwords does not match.")
        }


        if (password.length <= 5) {
            setLoading(false)
            return toast.error("Weak password.")
        }

        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, subject: "!!BATCHMATE VERIFICATION !!",
                    msg: `<h2>Your verification code is ${otp}</h2>`,
                    type: "signup"
                })
            })
            let result = await res.json();
            console.log(result);
            if (result.message === "Message sent successfully") {
                setIsOtpSent(true);
                return setLoading(false)
            }
            toast.error(result.message)
            return setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error('Failed to register.')
        }
    }


    const handleSignup = async e => {
        e.preventDefault();
        setLoading(true)
        if (otp !== +formData.userOtp) {
            setLoading(false)
            return toast.error("Invalid verification code.")
        }
        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            let result = await res.json()
            if (result.msg === "Account created successfully :)") {
                toast.success(result.msg);

                setCookie("batchmate", result.token);
                const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/get-user-info`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${result.token}`
                    }
                })
                const parsedResp = await resp.json();

                dispatch({
                    type: 'saveUserData',
                    ...parsedResp
                })


            } else {
                return toast.error(result.msg);
            }
            setLoading(false)
            dispatch({
                type: "loginUser",
                token: result.token
            })
            return navigate("/")

        } catch (error) {
            setLoading(false)
            return toast.error("Error creating account.")
        }
    }

    return (
        <>
            <NavLink to="/login" className="absolute top-3 left-3">
                <IoArrowBack size={30} color='black' />
            </NavLink>
            <form className='w-screen h-screen flex flex-col justify-start items-center' onSubmit={isOtpSent ? handleSignup : handleSendOtp}>
                <h1 className='mt-16 text-5xl font-["Rubik_Scribble"] font-normal not-italic text-center text-red-500 ' style={{ textShadow: "0px 0px 5px black" }}  >Batchmate</h1>

                {/* input name */}
                <input
                    type="text"
                    placeholder='Full Name'
                    className='mt-12 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                    name='name'
                    onChange={handleChange}
                    required
                    readOnly={isOtpSent ? true : false}
                />

                {/* input email */}
                <input
                    type="email"
                    placeholder='xyz@email.com'
                    className='mt-6 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                    name='email'
                    onChange={handleChange}
                    required
                    readOnly={isOtpSent ? true : false}

                />

                <input
                    type="text"
                    placeholder='Branch'
                    className='mt-6 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                    value="Computer Engineering"
                    readOnly
                />

                <input
                    type="number"
                    placeholder='Roll no.'
                    className='mt-6 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                    onChange={handleChange}
                    name='rollNo'
                    readOnly={isOtpSent ? true : false}
                    required
                />


                {/* password input wrapper */}
                <div className='mt-6 flex-col justify-center items-center'>

                    <div className='w-[74vw] h-[6.6vh] flex justify-center items-center relative'>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder='**password**'
                            className='text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                            name='password'
                            onChange={handleChange}
                            required
                            readOnly={isOtpSent ? true : false}

                        />
                        <button className='absolute top-0 right-4 bottom-0' type="button" onClick={() => { setShowPass(!showPass) }}>
                            {
                                showPass ? <FaEye /> : <FaEyeSlash />
                            }
                        </button>
                    </div>

                </div>

                {/* confirm password input wrapper */}
                <div className='mt-6 flex-col justify-center items-center'>

                    <div className='w-[74vw] h-[6.6vh] flex justify-center items-center relative'>
                        <input
                            type={showCurrPass ? "text" : "password"}
                            placeholder='**confirm password**'
                            className='text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                            name='cpassword'
                            onChange={handleChange}
                            required
                            readOnly={isOtpSent ? true : false}
                        />
                        <button className='absolute top-0 right-4 bottom-0' type="button" onClick={() => { setShowCurrPass(!showCurrPass) }}>
                            {
                                showCurrPass ? <FaEye /> : <FaEyeSlash />
                            }
                        </button>
                    </div>

                </div>

                <div className='mt-1 flex w-[70vw] justify-between items-start text-blue-600 active:text-blue-950'>
                    <NavLink to="/login" className="text-[0.9rem] font-semibold">Already have an account?</NavLink>
                </div>


                {/* code input wrapper */}
                {
                    isOtpSent &&
                    <div className='mt-6 flex-col justify-center items-center'>

                        <div className='w-[74vw] h-[6.6vh] flex justify-center items-center relative'>
                            <input
                                type='number'
                                placeholder='Enter verification code..'
                                className='text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                                name='userOtp'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mt-1 flex w-[70vw] justify-end items-start text-blue-600 active:text-blue-950'>
                            <p className="text-[0.9rem] text-right font-semibold">Resend</p>
                        </div>

                    </div>

                }

                <button type='submit' className='mt-6 text-lg bg-black text-white py-1 px-4 rounded active:bg-slate-600 w-32 h-10 flex justify-center items-center'
                >
                    {!loading ?
                        isOtpSent ? "VERIFY" : "SIGN UP"
                        : <RotatingLines height="30" width="30" strokeColor='white' />}
                </button>

            </form>
        </>

    );
};

export default Signup;

