import React, { useState, useEffect, useRef } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [processedImg, setProcessedImg] = useState(null); // Store processed image URL
  const [downloadUrl, setDownloadUrl] = useState(null);   // Store download link

  const handleImgChange = (event) => {
    const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImg(file); // Store the file instead of URL for API upload
      setImgUploaded(true);
      setProcessedImg(null);  // Reset processed image when a new file is uploaded
      setDownloadUrl(null);   // Reset download URL when a new file is uploaded
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleImgChange(event);
  };

  const applyFilter = (filterType) => {
    const formData = new FormData();
    formData.append("image", img);

    let apiEndpoint = '';
    if (filterType === 'greyscale') {
      apiEndpoint = '/api/image/greyscale';
    } else if (filterType === 'blackwhite') {
      apiEndpoint = '/api/image/blackwhite';
    }

    // Sending image to the backend for processing
    fetch(apiEndpoint, {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImg(imageUrl);     // Set the processed image URL for preview
      setDownloadUrl(imageUrl);      // Set the download URL for the image
    })
    .catch(error => {
      console.error("Error processing image:", error);
    });
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
<<<<<<< HEAD
    autoplaySpeed: 3000,
=======
    autoplaySpeed: 3500, 
>>>>>>> f806bad4262c137681b38a2a1a418f395b98fc5e
    arrows: true
  };

  const images = [img1, img2, img3, img4, img5, img6];

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
<<<<<<< HEAD
    <div className="h-full w-full bg-gradient-to-b from-gray-900 to-indigo-950 text-white">
      <nav className="flex items-center justify-between p-6 bg-transparent">
        <div className="text-2xl font-bold">GoSnap</div>
      </nav>

      {/* Image Slider */}
      <div className="w-11/12 lg:w-10/12 xl:w-8/12 mx-auto mb-10 mt-6">
        <Slider {...settings} className="relative">
          {images.map((imgUrl, index) => (
            <div key={index} className="p-4">
              <img
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-[200px] md:h-[500px] object-contain rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
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

        {/* Drag and Drop Area */}
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
          onClick={() => document.getElementById('fileInput').click()}
        >
          {!imgUploaded && <p>Drag and drop an image here, or click to select</p>}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            className="hidden"
          />

          {img && (
            <div className="mt-6">
              <img
                src={URL.createObjectURL(img)}
                alt="Selected"
                className="max-w-full max-h-96 rounded-md shadow-md"
              />
            </div>
          )}
=======
    <div className="h-full w-full bg-gradient-to-b from-black to-gray-950 text-white">
    {/* Navbar */}
    <nav className="flex items-center justify-between p-6 bg-transparent">
      <div className="text-2xl font-bold ">
        <img src="/logo.jpg" alt="GoSnap" className="h-[3.5rem] w-auto md:h-[3.5rem] rounded-xl " />
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
        <div className="flex items-center space-x-4 text-blue-950">
          <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
            <button className="outline-none px-4 py-1 rounded-l-full text-blue-950 bg-white hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out" aria-pressed="true">
              Light
            </button>
            <button className="outline-none px-4 py-1 rounded-r-full text-white bg-gray-950 hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out" aria-pressed="false">
              Dark
            </button>
          </div>
>>>>>>> f806bad4262c137681b38a2a1a418f395b98fc5e
        </div>

        {/* Filter Buttons */}
        {imgUploaded && (
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              onClick={() => applyFilter('greyscale')}
            >
              Apply Greyscale
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => applyFilter('blackwhite')}
            >
              Apply Black & White
            </button>
          </div>
        )}

        {/* Processed Image Preview */}
        {processedImg && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Processed Image:</h2>
            <img
              src={processedImg}
              alt="Processed"
              className="max-w-full max-h-96 rounded-md shadow-md"
            />
          </div>
        )}

        {/* Download Button */}
        {downloadUrl && (
          <div className="mt-4">
            <a
              href={downloadUrl}
              download="processed_image.jpg"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Download Processed Image
            </a>
          </div>
        )}
      </div>
    </nav>
  
    {/* Image Slider */}
    <div className="w-[95%] mx-auto mb-10 mt-2">
      <Slider {...settings} className="relative">
        {images.map((imgUrl, index) => (
          <div key={index} className="p-4">
            <img
              src={imgUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-[100px] md:h-[380px] object-contain rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        ))}
      </Slider>
    </div>
<<<<<<< HEAD
=======
  
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
        onClick={() => document.getElementById('fileInput').click()}
      >
        {!imgUploaded && <p>Drag and drop an image here, or click to select</p>}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          className="hidden"
        />
  
        {img && (
          <div className="mt-6">
            <img
              src={img}
              alt="Selected"
              className="max-w-full max-h-96 rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  </div>
  
>>>>>>> f806bad4262c137681b38a2a1a418f395b98fc5e
  );
}

export default Home;
