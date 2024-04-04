import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"

const Signup = () => {
    const [showPass, setShowPass] = useState(false);
    const [showCurrPass, setShowCurrPass] = useState(false);
    const [loading, setLoading] = useState(false)

    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-screen h-screen flex flex-col justify-start items-center'>
            <h1 className='mt-16 text-5xl font-["Rubik_Scribble"] font-normal not-italic text-center text-red-500 ' style={{ textShadow: "0px 0px 5px black" }}  >Batchmate</h1>

            {/* input name */}
            <input
                type="text"
                placeholder='Full Name'
                className='mt-12 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
            />

            {/* input email */}
            <input
                type="email"
                placeholder='xyz@email.com'
                className='mt-6 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
            />

            {/* college name */}
            <input
                type="text"
                placeholder='College'
                className='mt-6 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
            />

            {/* brach name */}
            <input
                type="text"
                placeholder='Branch'
                className='mt-6 text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
            />


            {/* password input wrapper */}
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

            {/* confirm password input wrapper */}
            <div className='mt-6 flex-col justify-center items-center'>

                <div className='w-[74vw] h-[6.6vh] flex justify-center items-center relative'>
                    <input
                        type={showCurrPass ? "text" : "password"}
                        placeholder='**confirm password**'
                        className='text-black font-bold rounded p-2 text-l caret-blue-700 w-[70vw] shadow shadow-black'
                    />
                    <button className='absolute top-0 right-4 bottom-0' onClick={() => { setShowCurrPass(!showCurrPass) }}>
                        {
                            showCurrPass ? <FaEye /> : <FaEyeSlash />
                        }
                    </button>
                </div>

            </div>


            <div className='mt-1 flex w-[70vw] justify-between items-start text-blue-600 active:text-blue-950'>
                <NavLink to="/login" className="text-[0.8rem]">Already have an account?</NavLink>
            </div>

            <button className='mt-6 text-lg bg-black text-white py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center' onClick={() => setLoading(!loading)}>
                {!loading ? "SIGN UP" : <RotatingLines height="30" width="30" strokeColor='white' />}
            </button>

        </form>
    );
};

export default Signup;

