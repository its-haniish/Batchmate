import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom"

const Login = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-screen h-screen flex flex-col justify-start items-center'>
            <h1 className='mt-16 text-5xl font-["Rubik_Scribble"] font-normal not-italic text-center text-red-500 ' style={{ textShadow: "0px 0px 5px black" }}  >Batchmate</h1>
            {/* input email */}
            <input
                type="email"
                placeholder='xyz@email.com'
                className='mt-20 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
            />

            {/* password inout wrapper */}
            <div className='mt-6 flex-col justify-center items-center'>

                <div className='w-[74vw] h-[6.6vh] flex justify-center items-center relative'>
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder='**password**'
                        className='text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                    />
                    <button className='absolute top-0 right-4 bottom-0' onClick={() => { setShowPass(!showPass) }}>
                        {
                            showPass ? <FaEye /> : <FaEyeSlash />
                        }
                    </button>
                </div>
            </div>

            <div className='mt-1 flex w-[70vw] justify-between items-start text-blue-600 active:text-blue-950'>
                <NavLink to="/signup" className="text-[0.8rem]">New student?</NavLink>
                <NavLink to="/login" className="text-[0.8rem]">Forgot Password?</NavLink>
            </div>

            <input
                type="submit"
                value='SIGN IN'
                className='mt-5 bg-black text-white py-1 px-4 rounded active:bg-slate-600'
            />
        </form>
    );
};

export default Login;
