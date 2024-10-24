import React, { useState, useEffect, useCallback } from 'react';
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
import Cropper from 'react-easy-crop';

function Home() {
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null); 
  const [isDragging, setIsDragging] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [processedImg, setProcessedImg] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false); 
  const [filters, setFilters] = useState([]); 
  const [filter, setFilter] = useState(''); 
  const [value, setValue] = useState(null);
  const [cropData, setCropData] = useState({ width: '', height: '', top: '', left: '' });
  const [resizeData, setResizeData] = useState({ width: '', height: '' });
  const [watermarkText, setWatermarkText] = useState('');
  const [format, setFormat] = useState('jpeg');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const base = 'http://localhost:5000/api/image/';
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const applyCrop = async () => {
    const formData = new FormData();
    formData.append('image', imgFile);
    formData.append('width', croppedAreaPixels.width);
    formData.append('height', croppedAreaPixels.height);
    formData.append('left', croppedAreaPixels.x);
    formData.append('top', croppedAreaPixels.y);

    const response = await fetch(base + 'crop', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImg(url);
    } else {
      console.error('Error cropping image');
    }
  };

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
      setImg(URL.createObjectURL(file)); 
      setImgFile(file); 
      setImgUploaded(true);
      setProcessedImg(null); 
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleImgChange(event);
  };

  const applyFilter = async (filterType) => {
    if (!imgFile) return;
    const endpoint = base + filterType;

    const formData = new FormData();
    formData.append('image', imgFile);

    if (filterType === 'brightness' || filterType === 'saturation') {
      formData.append('value', value);
    }
    if (filterType === 'crop') {
      formData.append('width', cropData.width);
      formData.append('height', cropData.height);
      formData.append('top', cropData.top);
      formData.append('left', cropData.left);
    }
    if (filterType === 'resize') {
      formData.append('width', resizeData.width);
      formData.append('height', resizeData.height);
    }
    if (filterType === 'watermark') {
      formData.append('watermarkText', watermarkText);
    }
    if (filterType === 'convert') {
      formData.append('format', format);
    }

    try {
      setIsProcessing(true);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData, 
      });

      if (res.ok) {
        const blob = await res.blob(); 
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImg(processedUrl);
      } else {
        console.error(`Failed to apply ${filterType} filter`);
      }
    } catch (error) {
      console.error(`Error applying ${filterType} filter`, error);
    } finally {
      setIsProcessing(false);
    }
  };

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
  <Navbar tranparent />
  <div className="w-[90%] mx-auto mb-10 mt-6">
    <Slider {...settings} className="relative">
      {images.map((imgUrl, index) => (
        <div key={index} className="p-2">
          <img
            src={imgUrl}
            alt={`Slide ${index + 1}`}
            className="select-none w-full h-[150px] md:h-[400px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg"
          />
        </div>
      ))}
    </Slider>
  </div>

  <div className="flex flex-col items-center justify-center text-center h-full pb-8">
    <h1 className="text-3xl md:text-5xl font-bold mb-6">
      Apply Filters to Your Images <span className="text-indigo-400">Effortlessly</span>
    </h1>
    <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto">
      GoSnap is a free online tool that allows you to apply filters to your images with just a few clicks.
    </p>

    <div className="flex flex-col md:flex-row justify-evenly w-full space-y-6 md:space-y-0">
      <div>
        <div
          className={`m-8 border-4 border-dashed rounded-lg p-6 bg-gray-700 text-gray-300 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-indigo-500' : 'border-gray-500'}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('imgInput').click()}
        >
          {imgUploaded ? (
            <img src={img} alt="Uploaded" className="max-h-[300px] mx-auto rounded-lg shadow-lg" />
          ) : (
            <>
              <p className="text-lg">Drag and drop your image here or click to upload</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, JPEG</p>
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
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition-all"
                onClick={() => applyFilter(filter)}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Apply Filter'}
              </button>
            </div>

            {/* Brightness Filter */}
            {filter === 'brightness' && (
              <div className="flex justify-center items-center space-x-4 mt-4">
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
            )}

            {/* Cropping UI */}
            {filter === 'crop' && (
              <div className="relative w-full h-80 bg-slate-500 mt-6 rounded-lg shadow-md overflow-hidden">
                <Cropper
                  image={img}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
                <div className="flex flex-col items-center space-y-4 mt-4">
                  <label className="text-gray-200">Zoom:</label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-48"
                  />
                </div>
                <button
                  className="absolute bottom-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                  onClick={applyCrop}
                >
                  Apply Crop
                </button>
              </div>
            )}

            {/* Saturation Filter */}
            {filter === 'saturation' && (
              <div className="flex justify-center items-center space-x-4 mt-4">
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
            )}

            {/* Resize Filter */}
            {filter === 'resize' && (
              <div className="mb-6">
                <input
                  type="number"
                  placeholder="Width"
                  className="p-2 m-2 bg-gray-700 text-white border border-gray-500 rounded"
                  value={resizeData.width}
                  onChange={(e) => setResizeData({ ...resizeData, width: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Height"
                  className="p-2 m-2 bg-gray-700 text-white border border-gray-500 rounded"
                  value={resizeData.height}
                  onChange={(e) => setResizeData({ ...resizeData, height: e.target.value })}
                />
              </div>
            )}

            {/* Watermark Filter */}
            {filter === 'watermark' && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter Watermark Text"
                  className="p-2 m-2 bg-gray-700 text-white border border-gray-500 rounded"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                />
              </div>
            )}

            {/* Convert Filter */}
            {filter === 'convert' && (
              <div className="mb-6">
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="p-2 m-2 bg-gray-700 text-white border border-gray-500 rounded">
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WEBP</option>
                  <option value="jpg">JPG</option>
                </select>
              </div>
            )}
          </>
        )}
      </div>

      {processedImg && (
  <div className="mt-14 m-14 flex flex-col items-center space-y-6">
    <img 
      src={processedImg} 
      alt="Processed" 
      className="w-full max-w-[450px] max-h-[450px] object-contain rounded-lg shadow-lg" 
    />
    <a
      href={processedImg}
      download={`converted_image.${format}`}
      className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 transition-all"
    >
      Download Processed Image
    </a>
  </div>
)}
    </div>
  </div>
</div>
  )};

export default Home;
