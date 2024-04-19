import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { setCookie } from "../../utils/cookies.js"


const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            let result = await res.json()
            if (result.message === "Login successfull") {
                toast.success(result.message);
                setCookie("batchmate", JSON.stringify({
                    token: result.token,
                    studentId: result.studentId,
                    studentName: result.studentName
                }));
                dispatch({
                    type: "loginUser",
                    token: result.token,
                    studentId: result.studentId,
                    studentName: result.studentName
                })
                setLoading(false)
                return navigate("/")
            } else {
                setLoading(false)
                return toast.error(result.message);
            }

        } catch (error) {
            setLoading(false)
            return toast.error("Error creating account.")
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-screen h-screen flex flex-col justify-start items-center'>
            <h1 className='mt-16 text-5xl font-["Rubik_Scribble"] font-normal not-italic text-center text-red-500 ' style={{ textShadow: "0px 0px 5px black" }}  >Batchmate</h1>
            {/* input email */}
            <input
                type="email"
                placeholder='xyz@email.com'
                className='mt-24 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                name='email'
                onChange={handleChange}
            />

            {/* password inout wrapper */}
            <div className='mt-10 flex-col justify-center items-center'>

                <div className='w-[74vw] h-[6.6vh] flex justify-center items-center relative'>
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder='**password**'
                        className='text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                        name='password'
                        onChange={handleChange}
                    />
                    <div className='absolute top-0 right-4 bottom-0' onClick={() => { setShowPass(!showPass) }}>
                        {
                            showPass ? <FaEye /> : <FaEyeSlash />
                        }
                    </div>
                </div>
            </div>

            <div className='mt-1 flex w-[70vw] justify-between items-start text-blue-600 active:text-blue-950'>
                <NavLink to="/signup" className="text-[0.8rem]">New student?</NavLink>
                <NavLink to="/forget-password" className="text-[0.8rem]">Forgot Password?</NavLink>
            </div>

            <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center' type='submit' onClick={handleSubmit}>
                {!loading ? "SIGN IN" : <RotatingLines height="30" width="30" strokeColor='white' />}
            </button>

        </form>
    );
};

export default Login;
