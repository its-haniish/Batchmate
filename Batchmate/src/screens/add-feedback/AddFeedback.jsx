import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useSelector, useDispatch } from "react-redux"

const AddFeedback = () => {
    
    const [rating, setRating] = useState(1);
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        teacher: "",
        stars: "",
        message: ""
    });


    const getTeachersList = async () => {
        let res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-teachers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        let result = await res.json();
        setTeachers(result);
    }

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        const data = { ...formData, stars: rating };
        console.log(data);
        let res = await fetch(`${process.env.REACT_APP_BASE_URL}/add-feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        let result = await res.json();

        console.log(result);



    }

    useEffect(() => {
        getTeachersList();
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen w-screen'>
                <form action="" className='flex flex-col gap-5 items-start h-full justify-start mt-4 w-full *:w-[95%] *:self-center' onSubmit={handleSubmit}>

                    <h2 className='text-3xl font-bold text-center'>Write Feedback 👏</h2>

                    <div className='w-screen flex flex-row justify-center gap-3 items-center' >
                        <label className='text-lg font-bold'>Select Teacher: </label>

                        <select name="teacher" className='border rounded px-2 w-fit h-fit border-black shadow-md outline-none' onChange={handleChange}>
                            <option value="" >none</option>
                            {
                                teachers.map(teacher => <option value={teacher.name} >{teacher.name}</option>)
                            }
                        </select>

                    </div>


                    <Rating style={{ maxWidth: 230, filter: 'drop-shadow(0 0 2px orange)' }} value={rating} onChange={setRating} itemStyles={{ itemShapes: StickerStar, activeFillColor: '#ffb700', inactiveFillColor: '#fbf990' }} />

                    <textarea className='bg-gray-200 rounded-xl p-2 focus:outline-none focus:border-none shadow-md hover:bg-gray-300 transition-colors' cols="30" rows="7" placeholder='I would like to say...' name="message" onChange={handleChange}
                    ></textarea>

                    <input className='bg-blue-300 rounded-xl p-3 px-5 text-white shadow-md font-bold hover:shadow-xl hover:bg-blue-500 transition-all' type="submit" value="Submit" />
                </form>
            </div>

        </>
    )
}

export default AddFeedback