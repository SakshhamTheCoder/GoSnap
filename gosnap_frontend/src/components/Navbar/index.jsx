import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ tranparent = false }) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/about');
    };
    return (
        <nav className={`flex items-center justify-between p-6 ${tranparent ? 'bg-transparent' : 'bg-black/40'}`}>
            <div className="text-2xl font-bold">
                <img
                    src="/logo.jpg"
                    alt="GoSnap"
                    className="h-[3.5rem] w-auto md:h-[3.5rem] rounded-xl "
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className="flex space-x-2 md:space-x-6">

                <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
                    <button
                        className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={handleNavigation}
                    >
                        About Us
                    </button>
                </div>

                {/* <div className="flex items-center space-x-4 text-blue-950">
                    <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
                        <button className="outline-none px-4 py-1 rounded-l-full text-blue-950 bg-white hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out">
                            Light
                        </button>
                        <button className="outline-none px-4 py-1 rounded-r-full text-white bg-gray-950 hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out">
                            Dark
                        </button>
                    </div>
                </div> */}
            </div>
        </nav >
    );
};

export default Navbar;