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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  const images = [img1, img2, img3, img4, img5, img6];

  return (
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
    </div>
  );
}

export default Home;
