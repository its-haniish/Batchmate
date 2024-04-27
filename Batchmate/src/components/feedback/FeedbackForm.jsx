
import React, { useEffect, useState } from 'react';
import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FeedbackForm = ({ teacherName, teacherId }) => {
    const { token } = useSelector(state => state.authReducer)
    const [rating, setRating] = useState(1)
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const data = { ...formData, teacherName, stars: rating, teacherId, time: new Date().getTime() };
        const tokenParsed = JSON.parse(token);

        try {
            const data = { ...formData, teacherName, stars: rating, teacherId, time: new Date().getTime() };
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/add-feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenParsed.token}`
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

    return (
        <form className='flex flex-col gap-5 items-start h-full justify-center w-full *:w-[95%] *:self-center' onSubmit={handleSubmit}>
            <h2 className='text-3xl font-bold ' >Write Feedback 👏</h2>
            <Rating style={{ maxWidth: 230, filter: 'drop-shadow(0 0 2px orange)' }} value={rating} onChange={setRating} itemStyles={{ itemShapes: StickerStar, activeFillColor: '#ffb700', inactiveFillColor: '#fbf990' }} />
            <textarea className='bg-gray-200 rounded-xl p-2 focus:outline-none focus:border-none shadow-md hover:bg-gray-300 transition-colors' cols="30" rows="7" placeholder='I would like to say...'
                name="message" onChange={handleChange}></textarea>
            <input className='bg-black rounded-xl p-3 px-5 text-white shadow-md font-bold hover:shadow-xl hover:bg-blue-500 transition-all' type="submit" value="Submit" />
        </form>
    )
}

export default FeedbackForm