import React, { useEffect, useLayoutEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import getTeachersList from "../../utils/getTeachersList.js"
import autoLogin from '../../utils/autoLogin.js';


const AddFeedback = () => {
    const { isUserLoggedIn, token } = useSelector(state => state.authReducer);
    const { teachers } = useSelector(state => state.allTeachersReducer);
    const [rating, setRating] = useState(1);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {

            const teacherId = teachers.filter(teacher => teacher.name === formData.teacherName)[0]?._id;

            const data = { ...formData, stars: rating, teacherId, time: new Date().getTime() };

            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/add-feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            let result = await res.json();
            console.log(result);
            if (result?.message === "Feedback added successfully") {
                setLoading(false)
                toast.success(result.message)
                return navigate("/")
            }
            setLoading(false)
            return toast.error(result.error)

        } catch (error) {
            console.log(error);
            setLoading(false)
            return toast.error("Error saving the feedback.")
        }

    }

    useEffect(() => {

        if (teachers === null) {
            getTeachersList(dispatch, setLoading)
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen w-screen'>
                <form action="" className='flex flex-col gap-5 items-start h-full justify-start mt-4 w-full *:w-[95%] *:self-center' onSubmit={handleSubmit}>

                    <h2 className='text-3xl font-bold text-center'>Write Feedback 👏</h2>

                    <div className='w-screen flex flex-row justify-center gap-3 items-center' >
                        <label className='text-lg font-bold'>Select Teacher: </label>

                        <select name="teacherName" className='border rounded px-2 h-fit border-black shadow-md outline-none uppercase w-[50%]' onChange={handleChange}>
                            <option value="" >none</option>
                            {
                                teachers && teachers.map(teacher => <option key={teacher._id} value={teacher.name} className='uppercase' >{teacher.name}</option>)
                            }
                        </select>

                    </div>


                    <Rating style={{ maxWidth: 230, filter: 'drop-shadow(0 0 2px orange)' }} value={rating} onChange={setRating} itemStyles={{ itemShapes: StickerStar, activeFillColor: '#ffb700', inactiveFillColor: '#fbf990' }} />

                    <textarea className='bg-gray-200 rounded-xl p-2 focus:outline-none focus:border-none shadow-md hover:bg-gray-300 transition-colors' cols="30" rows="7" placeholder='I would like to say...' name="message" onChange={handleChange}
                    ></textarea>

                    <button className='mt-5 bg-black text-white text-lg py-1 px-4 rounded active:bg-slate-600 w-28 h-10 flex justify-center items-center' type='submit' onClick={handleSubmit}>
                        {!loading ? "SUBMIT" : <RotatingLines height="30" width="30" strokeColor='white' />}
                    </button>
                </form>
            </div>

        </>
    )
}

export default AddFeedback