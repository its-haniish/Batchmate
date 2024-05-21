import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { RotatingLines } from 'react-loader-spinner';
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const ForgetPass = () => {
    const [formData, setFormData] = useState({})
    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);
    const [otp] = useState(Math.floor(Math.random() * 1000000));
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false)
    const { isUserLoggedIn } = useSelector(state => state.authReducer);
    const navigate = useNavigate()

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSendOtp = async e => {
        e.preventDefault();
        setLoading(true)
        const { email } = formData;

        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, subject: "!!BATCHMATE VERIFICATION !!",
                    msg: `<h2>Verification code is for resetting your password is ${otp}</h2>`,
                    type: "forget password"
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
            toast.error('Failed to send code.')
        }
    }



    const handleChangePass = async e => {
        e.preventDefault()
        setLoading(true);
        const { email, password, cpassword } = formData;
        if (password !== cpassword) {
            setLoading(false)
            return toast.error("Passwords does not match.")
        }

        if (password.length <= 5) {
            setLoading(false)
            return toast.error("Weak password.")
        }
        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            })
            let result = await res.json();
            console.log(result.message);
            setLoading(false)
            if (result.message === "Password updated successfully.") {
                toast.success(result.message);
            } else {
                toast.error(result.message)
                if (result.message === "New password is same as your current password.") {
                    return setLoading(false)
                }
            }
            return isUserLoggedIn ?
                navigate("/") : navigate("/login")
        } catch (error) {
            console.log(error);
            toast.error("Unable to update password.")
            return setLoading(false)
        }

    }


    return (
        <>
            <button onClick={() => isOtpSent ? setIsOtpSent(false) : isUserLoggedIn ? navigate("/profile") : navigate("/login")} className="absolute top-3 left-3">
                <IoArrowBack size={30} color='black' />
            </button>

            <form onSubmit={loading ? e => e.preventDefault() : isOtpSent ? handleChangePass : handleSendOtp} className='w-screen h-fit flex flex-col justify-start items-center'>
                <h1 className='mt-16 text-5xl font-["Rubik_Scribble"] font-normal not-italic text-center text-red-500 ' style={{ textShadow: "0px 0px 5px black" }}  >RESET PASSWORD</h1>
                {/* input email */}

                <p className='mt-20 text-center w-full text-wrap px-9 font-Nunito font-semibold text-black'>
                    {
                        isOtpSent ?
                            "Enter the sent verification code. Don't forget to check the spam folder." :
                            'Enter the registered email to get verification code.'
                    }
                </p>

                {
                    isOtpSent ?
                        <>
                            <input
                                type="number"
                                placeholder='Enter verification code.'
                                className='mt-4 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                                readOnly={loading}
                                required
                                name='userOtp'
                                onChange={handleChange}
                            />

                            <div className='mt-4 flex-col h-fit justify-center items-center'>

                                <div className='w-[74vw] h-fit flex justify-center items-center relative'>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        placeholder='**password**'
                                        className='text-black h-fit my-1 font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                                        name='password'
                                        readOnly={loading}
                                        required
                                        onChange={handleChange}
                                    />
                                    <button type='button' className='absolute top-0 right-4 bottom-0' onClick={() => { setShowPass(!showPass) }}>
                                        {
                                            showPass ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className='mt-4 flex-col h-fit justify-center items-center'>

                                <div className='w-[74vw] h-fit flex justify-center items-center relative'>
                                    <input
                                        type={showCPass ? "text" : "password"}
                                        placeholder='**confirm password**'
                                        className='text-black font-bold h-fit my-1 rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                                        name='cpassword'
                                        required
                                        onChange={handleChange}
                                        readOnly={loading}
                                    />
                                    <button type='button' className='absolute top-0 right-4 bottom-0' onClick={() => { setShowCPass(!showCPass) }}>
                                        {
                                            showCPass ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </button>
                                </div>
                            </div>

                        </> :
                        <input
                            type="email"
                            placeholder='xyz@email.com'
                            className='mt-4 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                            readOnly={loading}
                            name='email'
                            required
                            onChange={handleChange}
                        />
                }
                <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center'>
                    {!loading ? isOtpSent ? "VERIFY" : "SUBMIT" : <RotatingLines height="30" width="30" strokeColor='white' />}
                </button>

            </form>
        </>
    );
};

export default ForgetPass;
