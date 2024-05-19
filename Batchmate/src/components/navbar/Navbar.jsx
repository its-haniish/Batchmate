import React, { useEffect, useState } from 'react';
import { FcSearch } from "react-icons/fc";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import { useSelector } from "react-redux"


const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const { image } = useSelector(state => state.userDetailsReducer)
    const navigate = useNavigate()

    const openSidebar = () => {
        setSidebarVisible(true);
    };
    const closeSidebar = () => {
        setSidebarVisible(false);
    }

    useEffect(() => {
        setSidebarVisible(false);
    }, [])

    const handleProfileClick = () => {
        if (!isUserLoggedIn) {
            navigate("/login")
        } else {
            navigate("/profile")
        }
    }
    return (
        <nav className='w-[screen] h-[6vh] flex justify-between py-1 px-3 shadow'>

            {/* menu bar */}
            <button className='text-white' onClick={openSidebar}><HiMenu size="25px" /></button>

            {/* search bar */}
            {/* <div className='bg-gray-100 flex justify-center items-center w-[60vw] relative rounded-xl px-2 my-1'>
                <input type="search" className='py-1 px-1 bg-transparent' placeholder='Search' />
                <button className='border-l border-l-slate-300 px-1'><FcSearch color='white' size="25px" /></button>
            </div> */}

            <div className='bg-none flex justify-center items-center w-[60vw] relative  my-1'>
                <h1 className='shadow-text-white text-bg-gradient text-xl font-["Rubik_Scribble"] font-semibold not-italic text-center'>BATCHMATE</h1>
            </div>

            {/* Image wrapper */}
            <div className="font-Nunito font-semibold text-xl text-center flex justify-center items-center" >
                <button className='bg-none border-none' onClick={handleProfileClick} style={{
                    width: "fit-content",
                    height: "fit-content",
                    borderRadius: "50%",
                    overflow: "hidden"
                }}>
                    <img
                        className='w-[30px] h-[30px]'
                        src={image === "" ? "/images/dummy-user.png" : `${process.env.REACT_APP_BASE_URL}/images/${image}`}
                        alt="user-image" />
                </button>
            </div>

            {/* Sidebar */}
            {sidebarVisible && <Sidebar closeSidebar={closeSidebar} />}
        </nav>
    )
}

export default Navbar;
