import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaInstagram } from "react-icons/fa";


const DevelopersData = ({ twitter, linkedin, insta, name, role }) => {
    return (
        <div className="bg-gray-200 w-[43vw] h-64 p-4 rounded-2xl shadow-lg flex flex-col justify-around mt-3">
            <div className="flex flex-col items-center justify-center">
                <div className="overflow-hidden bg-gradient-to-t from-yellow-200 to-red-300 w-20 h-20 rounded-full mb-4">
                    <img src={`/devs/${name}.jpg`} alt={name} />
                </div>
                <div className="text-lg font-semibold text-gray-700">{name}</div>
                <div className="text-sm text-gray-500">{role}</div>
            </div>
            <ul className="flex justify-around w-full transition duration-300 ease-in-out">
                {
                    twitter &&
                    <a href={`https://www.x.com/${twitter}`} target='_blank'>
                        <FaXTwitter />
                    </a>
                }
                {
                    linkedin &&
                    <a href={`https://www.linkedin.com/in/${linkedin}`} target='_blank'>
                        <FaLinkedin />
                    </a>

                }
                {
                    insta &&
                    <a href={`https://www.instagram.com/${insta}`} target='_blank'>
                        <FaInstagram />
                    </a>
                }
            </ul>
        </div>
    );
};

export default DevelopersData;
