import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaInstagram } from "react-icons/fa";


const DevelopersData = () => {
    return (
        <div className="bg-gray-200 w-40 h-64 p-6 rounded-2xl shadow-lg flex flex-col justify-around">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-t from-yellow-200 to-red-300 w-20 h-20 rounded-full mb-4"></div>
                <div className="text-lg font-semibold text-gray-700">Naman Saini</div>
                <div className="text-sm text-gray-500">Developer</div>
            </div>
            <ul className="flex justify-around w-full transition duration-300 ease-in-out">
                <a href="#">
                    <FaXTwitter />
                </a>
                <a href="#">
                    <FaLinkedin />
                </a>
                <a href="#">
                    <FaInstagram />
                </a>
            </ul>
        </div>
    );
};

export default DevelopersData;
