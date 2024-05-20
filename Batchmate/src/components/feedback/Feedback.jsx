import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoShareAndroid } from "react-icons/go";
import { useSelector } from 'react-redux';
import { likeFeedback, dislikeFeedback } from '../../utils/like';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Feedback = ({ message, teacherName, studentId, studentName, stars, id, likes, isAutoLoginLoading, teacherId }) => {
    const { _id } = useSelector(state => state.userDetailsReducer)
    const { token, isUserLoggedIn } = useSelector(state => state.authReducer)
    const [liked, setLiked] = useState(false)
    const [likedList, setLikedList] = useState([...likes])
    const [studentImage, setStudentImage] = useState(null)
    const starArray = Array.from({ length: stars }, (_, index) => index + 1);
    const navigate = useNavigate();
    const getStudentImageById = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get-student-image-by-id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            const data = await response.json();
            return data.image;
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (likedList.includes(_id)) {
            setLiked(true)
        }

        if (!isUserLoggedIn) {
            setLiked(false)
        }

        getStudentImageById(studentId).then(data => setStudentImage(data))

    }, [isAutoLoginLoading, isUserLoggedIn])

    const handleShare = () => {
        toast.info('Coming soon...')
    }

    return (
        <div className='w-[90%] mx-2 h-[22vh] rounded-lg flex justify-start items-center flex-shrink-0 gap-1 snap-center'>
            <div className='bg-gray-100 shadow-md  w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[23%]1'>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[22px] h-[22px] flex justify-center items-center aspect-square'>
                            <img src={studentImage ? `${process.env.REACT_APP_BASE_URL}/images/${studentImage}` : "/images/dummy-user.png"} alt="user-image" className='w-[20px] object-cover  h-[20px] rounded-[50%]' />
                        </div>
                        <p className='font-bold text-[15px] w-[80%] overflow-x-hidden text-ellipsis whitespace-nowrap'>{studentName}</p>
                    </div>

                    <div className='flex justify-start items-center gap-1'>
                        {starArray.map((_, index) => (
                            <FaStar key={index} stroke='gray' strokeWidth="50px" fill='gold' size="15px" />
                        ))}
                    </div>

                </div>

                {/* feedback message */}
                <p className='h-[70%] w-full px-2 text-[14px] font-normal text-gray-900 text-left line-clamp-5 text-ellipsis text-balance'>
                    {message}
                </p>

                {/* feedback target details */}
                <div className='flex justify-between items-center w-full h-[18%] py-1'>

                    <div className='flex justify-start items-center gap-1 overflow-hidden' onClick={() => navigate(`/teacher-details/${teacherId}`)}>
                        <div className='flex justify-center items-center w-[22px] h-5 rounded-[50%] border border-black overflow-hidden'>
                            <img src={`${process.env.REACT_APP_BASE_URL}/images/${teacherName}.png`} alt={teacherName} className='w-full h-full object-contain' />
                        </div>
                        <p className='font-bold text-[14px] w-[90%] overflow-x-hidden text-ellipsis whitespace-nowrap uppercase'>{teacherName}</p>

                    </div>

                    <div className='w-fit gap-1 flex justify-center items-center'>
                        <button onClick={isUserLoggedIn ? () => liked ? dislikeFeedback(id, token, setLiked, setLikedList, _id) : likeFeedback(id, token, setLiked, setLikedList, _id) : () => toast.info("Login to like a feedback.")} className='bg-none flex gap-2 items-center'>
                            {
                                liked ? <BiSolidLike size={20} fill='red' /> : <BiLike size={20} />
                            }
                            <p className='font-Nunito font-semibold text-sm mr-2'>{likedList?.length || 0}</p>
                        </button>
                        <GoShareAndroid size={18} fill='black' onClick={handleShare} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export const FeedbackLoader = () => {
    return (
        <section className='bg-gray-100 shadow w-[68vw] mx-2 h-[100%] rounded-lg flex justify-start items-center flex-shrink-0 animate-pulse'>
            <div className='w-full h-full py-[2px] px-2 flex flex-col justify-start gap-[1px] items-center'>

                {/* feedback sender details */}
                <div className='flex justify-between items-center w-full h-[16%]'>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[15px] h-[15px] rounded-[50%] animate-pulse bg-slate-200 '>
                        </div>
                        <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>
                    </div>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                        <div className='w-[11px] h-[11px] animate-pulse bg-slate-200 rounded'  ></div>
                    </div>

                </div>

                {/* feedback message */}
                <p className='h-[70%] w-full text-[11px] font-semibold bg-slate-200 animate-pulse rounded'>

                </p>

                {/* feedback target details */}
                <div className='flex justify-between items-center w-full h-[16%] '>

                    <div className='flex justify-start items-center gap-1'>
                        <div className='w-[15px] h-[15px] rounded-[50%] animate-pulse bg-slate-200'>
                        </div>
                        <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>
                    </div>
                    <p className='font-bold text-[11px] w-[80px] h-[15px] overflow-x-scroll text-nowrap bg-slate-200 rounded'></p>

                </div>

            </div>
        </section>
    )
}

export default Feedback;
