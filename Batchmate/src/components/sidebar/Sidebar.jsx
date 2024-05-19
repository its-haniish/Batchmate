import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { GiTeacher } from "react-icons/gi";
import { FaCode, FaTimes, FaUser, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux"
import { FaChevronRight } from "react-icons/fa6";

const Sidebar = ({ closeSidebar }) => {
    const sidebarRef = useRef(null);
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeSidebar]);

    return (
        <section ref={sidebarRef} className='w-[65%] overflow-hidden h-screen fixed left-0 top-0 bg-white shadow-lg z-50' >
            <button className='bg-none font-Nunito font-bold text-2xl mt-2 ml-2' onClick={closeSidebar}><FaTimes /></button>

            <h2 className='shadow-text-white text-bg-gradient mt-3 text-2xl font-["Rubik_Scribble"] font-semibold not-italic text-center'>BATCHMATE</h2>
            <hr className='my-3 w-full border-b-2 border-teal-900 rounded-xl' />

            <ul className='w-full h-[80%] flex flex-col justify-between'>

                <div className='w-full h-fit flex flex-col justify-start gap-5'>
                    {/* <div className='px-3'>
                    <h3 className='text-xl font-Nunito font-semibold text-teal-900'>General</h3>
                    <hr className='border-b-1 border-teal-600 rounded-xl' />
                </div> */}
                    <li className=''>
                        <NavLink to="/" className="font-Nunito font-semibold text-xl text-center flex justify-start gap-2 px-4 items-center" >
                            <HiHome size={18} className='mr-1' />Home
                        </NavLink>
                    </li>

                    <li className='text-center'>
                        <NavLink to="/teachers" className="font-Nunito font-semibold text-xl text-center flex justify-start gap-2 px-4 items-center" >
                            <GiTeacher size={18} className='mr-1' />Teachers
                        </NavLink>
                    </li>

                    {/* <div className='px-3'>
                    <h3 className='text-xl font-Nunito font-semibold text-teal-900'>Community</h3>
                    <hr className='border-b-1 border-teal-600 rounded-xl' />
                </div> */}
                    <li className='text-center'>
                        <NavLink to="/developers" className="font-Nunito font-semibold text-xl text-center flex justify-start gap-2 px-4 items-center" >
                            <FaCode size={18} className='mr-1' />Devs
                        </NavLink>
                    </li>
                </div>

                <div className='flex justify-between items-center bg-teal-950 *:text-white py-2 mx-3 px-4 shadow-md rounded-full'>
                    <li className='text-center'>
                        <button className="font-Nunito font-semibold text-xl text-center flex justify-start gap-2 items-center"
                            onClick={() => isUserLoggedIn ? navigate('/profile') : navigate("/login")}>
                            {
                                isUserLoggedIn ?
                                    <><FaUser size={18} fill='white' className='mr-1' />Profile</> :
                                    <><FaUserPlus size={20} fill='white' color='white' className='mr-1' />Sign In</>

                            }

                        </button>
                    </li>
                    <FaChevronRight fill='white' />
                </div>

            </ul>
        </section >
    )
}

export default Sidebar;
