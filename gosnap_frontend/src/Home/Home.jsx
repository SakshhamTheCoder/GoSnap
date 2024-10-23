import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '/image1.jpg';
import img2 from '/image2.jpg';
import img3 from '/image3.jpg';
import img5 from '/image5.jpg';
import img6 from '/image6.jpg';
import Navbar from '../components/Navbar/';


function Home() {
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null); // New state to hold the file for API upload
  const [isDragging, setIsDragging] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [processedImg, setProcessedImg] = useState(null); // State to hold processed image
  const [isProcessing, setIsProcessing] = useState(false); // State to manage processing status
  const [filters, setFilters] = useState([]); // State to hold filter list
  const [filter, setFilter] = useState(''); // State to hold selected filter
  const [value, setValue] = useState(null); // State to hold brightness value

  const base = 'http://localhost:5000/api/image/';

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch(base + 'list');
        if (res.ok) {
          const data = await res.json();
          setFilters(data.filters);
        } else {
          console.error('Failed to fetch filters');
        }
      } catch (error) {
        console.error('Error fetching filters', error);
      }
    };

    fetchFilters();
  }, []);

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

  // Filter API Calls
  const applyFilter = async (filterType) => {
    if (!imgFile) return;
    const endpoint = base + filterType;

    const formData = new FormData();
    formData.append('image', imgFile);
    if (value) formData.append('value', value);

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

  const images = [img1, img2, img3, img5, img6];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Navbar */}
      <Navbar tranparent />
      {/* Image Slider */}
      < div div className="w-[85%] mx-auto mb-10 mt-2" >
        <Slider {...settings} className="relative">
          {images.map((imgUrl, index) => (
            <div key={index} className="p-2">
              <img
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                className="select-none w-full h-[100px] md:h-[380px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </ div>

      <div className="flex flex-col items-center justify-center text-center h-full pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Apply Filters to Your Images <span className="text-indigo-400">Effortlessly</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-lg">
          GoSnap is a free online tool that allows you to apply filters to your images with just a few clicks.
        </p>
        <div className='flex flex-col md:flex-row justify-evenly w-full'>
          <div>
            <div
              className={`m-8 border-4 border-dashed rounded-lg p-5 bg-gray-700 text-gray-300 text-center cursor-pointer ${isDragging ? 'border-indigo-500' : 'border-gray-500'
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
              <>
                <div className="flex space-x-4 mt-4 justify-center">
                  <select className="p-2 rounded-lg bg-gray-800 text-white" onChange={(e) => { setFilter(e.target.value); setValue(null); }}>
                    <option value="">Select Filter</option>
                    {filters.map((filter) => (
                      <option key={filter.name} value={filter.name}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                    onClick={() => applyFilter(filter)}
                    disabled={isProcessing}
                  >
                    {
                      isProcessing ? 'Processing...' : 'Apply Filter'
                    }
                  </button>
                </div>
                {filter == 'brightness' && (<>
                  <div className='flex justify-center items-center space-x-4 mt-4'>
                    <p className="text-gray-500">Adjust brightness</p>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      defaultValue="1"
                      step="0.1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <p className="text-gray-500 w-2">{value}</p>
                  </div>
                </>
                )}
                {filter == 'saturation' && (<>
                  <div className='flex justify-center items-center space-x-4 mt-4'>
                    <p className="text-gray-500">Adjust saturation</p>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      defaultValue="1"
                      step="0.1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <p className="text-gray-500 w-2">{value}</p>
                  </div>
                </>
                )}
              </>)}
          </div>

          {/* Display Processed Image */}
          {processedImg && (
            <div className="mt-14 m-8 flex flex-col space-y-9">
              <img src={processedImg} alt="Processed" className="max-h-[300px] mx-auto" />
              <a
                href={processedImg}
                download="processed_image.jpg"
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
              >
                Download Processed Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default Home;
