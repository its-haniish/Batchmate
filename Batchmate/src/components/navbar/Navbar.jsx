import React from 'react'
import { FcSearch } from "react-icons/fc";
import { HiMenu } from "react-icons/hi";
import { toast } from 'react-toastify';

const Navbar = () => {
    const notify = () => toast.success("Wow so easy!");
    return (
        <nav className='w-[screen] h-[6vh] flex justify-between py-1 px-3 shadow'>

            {/* menu bar */}
            <button className='text-white ' onClick={notify}><HiMenu size="25px" /></button>

            {/* search bar */}
            <div className='flex justify-center items-center w-[60vw] relative shadow rounded pr-1'  >
                <input type="text" className='py-1 px-1 ' placeholder='Search' />
                <button className='border-l border-l-slate-300 px-1'><FcSearch color='white' size="25px" /></button>
            </div>

            {/* Image wrapper */}
            <button className='bg-none border-none'>
                <img
                    className='w-[30px] h-[30px]'
                    src="/images/dummy-user.png"
                    alt="user-image" />
            </button>


        </nav>
    )
}

export default Navbar;