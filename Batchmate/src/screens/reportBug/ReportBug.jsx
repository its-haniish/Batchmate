import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { FaBug } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner"
import { toast } from "react-toastify"
import { useSelector } from 'react-redux';

const ReportBug = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "", email: "", message: ""
    })
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const { name, email } = useSelector(state => state.userDetailsReducer)

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        const { name, email, message } = formData;

        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "info.batchmate@gmail.com",
                    subject: "!! SOMEONE REPORTED BUG !!",
                    msg: `<h2>Name: ${name}</h2>
                          <h2>Email: ${email}</h2>
                          <h2>Message: ${message}</h2>`,
                    type: "none"
                })
            })
            let result = await res.json();
            toast.success(result.message)
            return setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error('Failed to send message.')
        }
    }

    useEffect(() => {
        if (isUserLoggedIn) {
            setFormData({ ...formData, name, email })
        }
    }, [])

    return (
        <>
            <Navbar />
            <h1 className='text-2xl p-1 font-extrabold text-center bg-orange-400 rounded-3xl m-3 shadow-md mt-[7vh] flex justify-evenly items-center'>
                <FaBug size={35} /> <span>Report a Bug</span> <FaBug size={35} />
            </h1>
            <form onSubmit={!loading ? handleSubmit : e => { e.preventDefault(); toast.info("Please wait...") }}
                className='flex flex-col h-[80vh] gap-3 justify-start items-center w-screen px-2'
            >
                <input type="text"
                    placeholder='Name'
                    name='name' onChange={handleChange} readOnly={loading} value={formData.name}
                    className='border shadow-md w-3/4 p-1 text-xl text-black rounded text-center outline-none'
                />

                <input type="email"
                    placeholder='example@email.com'
                    name='email' onChange={handleChange} readOnly={loading} value={formData.email}
                    className='border shadow-md w-3/4 p-1 text-xl text-black rounded text-center outline-none'
                />

                <textarea
                    placeholder="I want to report that..."
                    name='message' onChange={handleChange} readOnly={loading} value={formData.message}
                    className='border shadow-md h-[32vh] w-3/4 p-1 text-xl text-black rounded text-center outline-none'
                    style={{ resize: "none" }}
                ></textarea>

                <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center' type='submit' >
                    {!loading ? "SUBMIT" : <RotatingLines height="30" width="30" strokeColor='white' />}
                </button>

            </form>
        </>
    )
}

export default ReportBug