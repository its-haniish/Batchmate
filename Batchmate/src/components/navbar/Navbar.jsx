import React, { useEffect, useState } from 'react';
import { FcSearch } from "react-icons/fc";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const openSidebar = () => {
        setSidebarVisible(true);
    };
    const closeSidebar = () => {
        setSidebarVisible(false);
    }

    useEffect(() => {
        setSidebarVisible(false);
    }, [])
    return (
        <nav className='w-[screen] h-[6vh] flex justify-between py-1 px-3 shadow'>

            {/* menu bar */}
            <button className='text-white' onClick={openSidebar}><HiMenu size="25px" /></button>

            {/* search bar */}
            <div className='bg-gray-100 flex justify-center items-center w-[60vw] relative rounded-xl px-2 my-1'>
                <input type="search" className='py-1 px-1 bg-transparent' placeholder='Search' />
                <button className='border-l border-l-slate-300 px-1'><FcSearch color='white' size="25px" /></button>
            </div>

            {/* Image wrapper */}
            <NavLink to="/profile" className="font-Nunito font-semibold text-xl text-center flex justify-center items-center" >
                <button className='bg-none border-none'>
                    <img
                        className='w-[30px] h-[30px]'
                        src="/images/dummy-user.png"
                        alt="user-image" />
                </button>
            </NavLink>

            {/* Sidebar */}
            {sidebarVisible && <Sidebar closeSidebar={closeSidebar} />}
        </nav>
    )
}

export default Navbar;
