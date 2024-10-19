import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Importing the LinkedIn and GitHub icons

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Dhruv Goyal",
      position: "Backend Developer",
      img: "/dhruv.jpg",
      description: "",
      linkedin: "https://www.linkedin.com/in/DhruvGoyalThapar/",
      github: "https://github.com/DhruvGoyal404",
    },
    {
      name: "Sakshham Bhagat",
      position: "Backend Developer",
      img: "/sakshham.jpg",
      description: "",
      linkedin: "https://www.linkedin.com/in/SakshhamTheCoder",
      github: "https://github.com/SakshhamTheCoder",
    },
    {
      name: "Shree Mishra",
      position: "Frontend Developer",
      img: "/shree.jpeg",
      description: "",
      linkedin: "https://www.linkedin.com/in/shree-mishra-aa2351288/",
      github: "https://github.com/ShreeMishraa",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: i * 0.5, 
        ease: "easeOut",
      },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -50 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5, 
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="h-[1500px] md:h-[1500px] w-full flex flex-col text-white bg-[url('/bg.jpg')] bg-cover bg-center">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-3 bg-gray-950 bg-opacity-70 fixed top-0 left-0 w-full z-10">
        <div className="text-2xl font-bold">
          <img
            src="/logo.jpg"
            alt="GoSnap"
            className="h-[3.5rem] w-auto md:h-[3.5rem] rounded-xl"
          />
        </div>
        <div className="flex space-x-2 md:space-x-6">
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Explore Filters
              </button>
            </div>

            {/* Dropdown Menu */}
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } origin-top-right absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Filter 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Filter 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Filter 3
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
            <button
              className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={() => navigate("/About")}
            >
              About Us
            </button>
          </div>

          <div className="flex items-center space-x-4 text-blue-950">
            <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
              <button
                className="outline-none px-4 py-1 rounded-l-full text-blue-950 bg-white hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out"
                aria-pressed="true"
              >
                Light
              </button>
              <button
                className="outline-none px-4 py-1 rounded-r-full text-white bg-gray-950 hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out"
                aria-pressed="false"
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Image Section */}
      <div className="relative bg-cover bg-center h-[600px] md:h-[600px]"></div>

      {/* Content Section */}
      <div className=" h-[500px] md:h-[500px] p-8 mb-0 bg-transparent "></div>

      {/* Team Section */}
      <div className="h-[400px] md:h-[400px] w-full p-8 mb-0 bg-gray-900 bg-opacity-50 ">
        <motion.h2
          className="text-3xl font-extrabold text-center mb-4 text-white "
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center"
              custom={index} 
              variants={cardVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="h-32 w-32 rounded-full object-cover mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-sm text-indigo-400 mb-1">{member.position}</p>
              <p className="text-sm text-gray-400 text-center">{member.description}</p>


              <div className="flex space-x-4 mt-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-400 hover:text-blue-600 text-2xl" />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-gray-300 hover:text-gray-500 text-2xl" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;



