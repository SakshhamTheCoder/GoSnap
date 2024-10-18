import React, { useState } from 'react';
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
    
  const handleImgChange = (event) => {
    const file = event.target.files? event.target.files[0]: event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImg(URL.createObjectURL(file)); //preview of file.
      setImgUploaded(true);
    }
  }

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleImgChange(event);
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    arrows: true
  };

  const images = [
    img1, img2, img3, img4, img5, img6
  ];

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 to-indigo-950 text-white">
      
      <nav className="flex items-center justify-between p-6 bg-transparent">
        <div className="text-2xl font-bold">GoSnap</div>
        <div className="space-x-6">
          <div className="flex items-center space-x-4 text-blue-950">
            <div className="flex items-center p-1 rounded-full bg-gray-200 shadow-lg">
              <button className="outline-none px-4 py-1 rounded-l-full text-blue-950 bg-white hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out" aria-pressed="true">
                Light
              </button>
              <button className="outline-none px-4 py-1 rounded-r-full text-white bg-gray-950 hover:text-violet-600 focus:border-blue-600 transition duration-200 ease-in-out" aria-pressed="false">
                Dark
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Image Slider*/}
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
          {(!imgUploaded && <p>Drag and drop an image here, or click to select</p>)}
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
    
  );
}

export default Home;



