import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Navbar from "../components/Navbar/";

const About = () => {
  const [bgClass, setBgClass] = useState("bg-[url('/bg.jpg')]");

  const teamMembers = [
    {
      name: "Dhruv Goyal",
      position: "Fullstack Developer",
      img: "/dhruv.jpg",
      description: "",
      linkedin: "https://www.linkedin.com/in/DhruvGoyalThapar/",
      github: "https://github.com/DhruvGoyal404",
    },
    {
      name: "Sakshham Bhagat",
      position: "Fullstack Developer",
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
        delay: i * 0.3,
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
    <div className={`h-[1300px] md:h-[1300px] w-full flex flex-col text-white ${bgClass} bg-cover bg-center`}>
      {/* Navbar */}
      <Navbar />

      {/* Image Section */}
      <div className=" bg-cover bg-center h-[600px] md:h-[600px]"></div>

      {/* Content Section */}
      <div className="h-[800px] md:h-[800px] p-8 mb-0 bg-transparent"></div>

      {/* Team Section */}
      <div className="h-[500px] md:h-[500px] w-full p-8 mb-0 bg-gray-900 bg-opacity-50 ">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-4 text-white "
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          Connect With Us!
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
              viewport={{ once: false, amount: 0.3 }}
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
          <div className="h-[80px] md:h-[80px] w-full p-8 mb-0" ></div>
        </div>
      </div>
    </div>
  );
};

export default About;



