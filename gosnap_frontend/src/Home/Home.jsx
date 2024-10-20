import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '/image1.jpg';
import img2 from '/image2.jpg';
import img3 from '/image3.jpg';
import img4 from '/image4.jpg';
import img5 from '/image5.jpg';
import img6 from '/image6.jpg';

function Home() {
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null); // New state to hold the file for API upload
  const [isDragging, setIsDragging] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [processedImg, setProcessedImg] = useState(null); // State to hold processed image
  const [isProcessing, setIsProcessing] = useState(false); // State to manage processing status
  
  const handleImgChange = (event) => {
    const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImg(URL.createObjectURL(file)); // Preview image for user
      setImgFile(file); // Store file for API call
      setImgUploaded(true);
      setProcessedImg(null); // Reset processed image if a new image is uploaded
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleImgChange(event);
  };

  const uploadImage = async () => {
    if (!imgFile) return;
    const formData = new FormData();
    formData.append('image', imgFile);
    try {
      setIsProcessing(true);
      const res = await fetch('http://localhost:5000/api/image/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        console.log('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter API Calls
  const applyFilter = async (filterType) => {
    if (!imgFile) return;
    const endpoint = filterType === 'greyscale' 
      ? 'http://localhost:5000/api/image/greyscale' // Ensure this matches your route
      : 'http://localhost:5000/api/image/blackwhite'; // Ensure this matches your route
  
    const formData = new FormData();
    formData.append('image', imgFile);
  
    try {
      setIsProcessing(true);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData, // Pass the image file in the request
      });
  
      if (res.ok) {
        const blob = await res.blob(); // Expecting a JPEG image as response
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImg(processedUrl); // Display the processed image
      } else {
        console.error(`Failed to apply ${filterType} filter`);
      }
    } catch (error) {
      console.error(`Error applying ${filterType} filter`, error);
    } finally {
      setIsProcessing(false);
    }
  };
  
 

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  const images = [img1, img2, img3, img4, img5, img6];
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

  const handleNavigation = () => {
    navigate('/About');
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-transparent">
        <div className="text-2xl font-bold">
          <img 
            src="/logo.jpg" 
            alt="GoSnap" 
            className="h-[3.5rem] w-auto md:h-[3.5rem] rounded-xl " 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' } }
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
                isOpen ? 'block' : 'hidden'
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
              onClick={handleNavigation}
            >
              About Us
            </button>
          </div>

          <div className="flex items-center space-x-4 text-blue-950">
            <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
              <button className="outline-none px-4 py-1 rounded-l-full text-blue-950 bg-white hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out">
                Light
              </button>
              <button className="outline-none px-4 py-1 rounded-r-full text-white bg-gray-950 hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out">
                Dark
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Image Slider */}
      <div className="w-[95%] mx-auto mb-10 mt-2">
        <Slider {...settings} className="relative">
          {images.map((imgUrl, index) => (
            <div key={index} className="p-2">
              <img
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-[100px] md:h-[380px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Apply Filters to Your Images <span className="text-indigo-400">Effortlessly</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-lg">
          GoSnap is a free online tool that allows you to apply filters to your images with just a few clicks.
        </p>

        <div
          className={`border-4 border-dashed rounded-lg p-5 bg-gray-700 text-gray-300 text-center cursor-pointer ${
            isDragging ? 'border-indigo-500' : 'border-gray-500'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('imgInput').click()}
        >
          {imgUploaded ? (
            <img src={img} alt="Uploaded" className="max-h-[300px] mx-auto" />
          ) : (
            <>
              <p className="text-lg">Drag and drop your image here or click to upload</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            id="imgInput"
            className="hidden"
            onChange={handleImgChange}
          />
        </div>

        {/* Filter Buttons */}
        {imgUploaded && (
          <div className="flex space-x-4 mt-4">
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
              onClick={() => applyFilter('greyscale')}
              disabled={isProcessing}
            >
              Apply Greyscale Filter
            </button>
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
              onClick={() => applyFilter('blackwhite')}
              disabled={isProcessing}
            >
              Apply Black & White Filter
            </button>
          </div>
        )}

        {/* Display Processed Image */}
        {processedImg && (
          <div className="mt-8">
            <img src={processedImg} alt="Processed" className="max-h-[300px] mx-auto" />
            <a
              href={processedImg}
              download="processed_image.jpg"
              className="block mt-4 text-indigo-500 underline"
            >
              Download Processed Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
