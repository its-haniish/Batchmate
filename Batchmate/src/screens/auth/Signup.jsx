import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { setCookie } from "../../utils/cookies.js"
import { IoArrowBack } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";


const Signup = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [otp] = useState(Math.floor(Math.random() * 1000000));
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [rollNo, setRollNo] = useState(null);
    const [showCurrPass, setShowCurrPass] = useState(false);
    const [loading, setLoading] = useState(false)
    const [idCard, setIdCard] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
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

        if (idCard === null) {
            setLoading(false)
            return toast.error("Please select your ID card.")
        }

        const rollNo = await getRollNo(idCard);
        if (rollNo === 'Try with diffrent image.' || rollNo === "An error occurred." || rollNo === "Select Id card.") {
            setLoading(false)
            return toast.error(rollNo);
        } else {
            setFormData({ ...formData, rollNo })
        }
        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, subject: "!!BATCHMATE VERIFICATION !!",
                    msg: `<h2>Your verification code is ${otp}</h2>`,
                    type: "signup", rollNo
                })
            })
            let result = await res.json();
            if (result.message === "Message sent successfully") {
                toast.success("Verification code sent to your email.")
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

    const getRollNo = async (image) => {
        if (!image) {
            return 'Select Image';
        }
        const formData = new FormData();  // Correctly initialize FormData
        formData.append("image", image);

        const url = 'https://qr-code-and-barcode-scanner.p.rapidapi.com/ScanCode';
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': 'acfe366f2emshd92fb24e344a931p11a157jsna63d8165285a',
                'X-RapidAPI-Host': 'qr-code-and-barcode-scanner.p.rapidapi.com'
            },
            body: formData
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();  // Parse the response as JSON

            if (result.statusMessage === "ok" && result.data && result.data.length > 0) {
                return result.data[0].allFields[0].fieldValue;
            } else {
                return 'Try with diffrent image.';
            }
        } catch (error) {
            console.error(error);
            return 'An error occurred.';
        }
    }

    return (
        <>
            <NavLink to="/login" className="absolute top-3 left-3">
                <IoArrowBack size={30} color='black' />
            </NavLink>
            <form className='w-screen h-fit flex flex-col justify-start items-center' onSubmit={isOtpSent ? handleSignup : handleSendOtp}>
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

                <div
                    className={`mt-6 h-[25vh] overflow-hidden text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black`}>

                    <label htmlFor="rollNo" className='w-full text-left'>
                        Select your ID card:
                    </label>

                    <div className='w-full h-[20vh] flex flex-col relative justify-center items-center  rounded-md overflow-hidden'>
                        {idCard && <img src={selectedImage} alt="user id card" className='w-[150px] z-[2] h-fit' />}

                        {!isOtpSent && <input
                            type="file"
                            placeholder='Roll no.'
                            className='absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 cursor-pointer z-20'
                            onChange={async e => {
                                const base64String = await readFileAsUrl(e.target.files[0]);
                                setSelectedImage(base64String);
                                setIdCard(e.target.files[0])
                            }}
                            required
                        />}
                        <button type='button' className='z-10 absolute top-0 left-0 right-0 bottom-0 w-full flex justify-center items-center' >
                            <FaFileUpload size={35} />
                        </button>

                    </div>


                </div>


                {/* password input wrapper */}
                <div className='mt-6 flex-col justify-center items-center'>

                    <div className='w-[74vw] h-fit flex justify-center items-center relative'>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder='**password**'
                            className='text-black h-fit my-1 font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
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

                    <div className='w-[74vw] h-fit flex justify-center items-center relative'>
                        <input
                            type={showCurrPass ? "text" : "password"}
                            placeholder='**confirm password**'
                            className='text-black h-fit my-1 font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
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

                <div className='mt-2 h-fit flex w-[70vw] justify-between items-start text-blue-600 active:text-blue-950'>
                    <NavLink to="/login" className="text-[0.9rem] font-semibold">Already have an account?</NavLink>
                </div>


                {/* code input wrapper */}
                {
                    isOtpSent &&
                    <div className='mt-6 flex-col justify-center items-center h-fit'>
                        <p
                            className=' rounded text-sm text-red-500 w-[70vw] h-fit text-wrap text-center mb-3'
                        >Verification code is sent to your mail. Dont't forget to check the spam folder.</p>

                        <div className='w-[74vw] h-[10vh] flex justify-center items-center relative'>
                            <input
                                type='number'
                                placeholder='Enter verification code..'
                                className='text-black h-fit font-bold rounded p-2 caret-blue-700 w-[70vw] shadow shadow-black'
                                name='userOtp'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mt-1 flex w-[70vw] justify-end items-start '>
                            <p className="text-[0.9rem] text-right font-semibold text-blue-600 active:text-blue-950">Resend</p>
                        </div>

                    </div>

                }

                <button type='submit' className='mt-6 mb-5 text-lg bg-black text-white py-1 px-4 rounded active:bg-slate-600 w-32 h-10 flex justify-center items-center'
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

