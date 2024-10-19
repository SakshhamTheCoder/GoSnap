import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home'; 
import About from './About/About';
import './index.css';

function App() {
  return (
    <>
    <Routes>
     <Route path="/" element= {<Home />}></Route>
      <Route path="/about" element= {<About/>}></Route>
    </Routes>
    </>
  );
}

export default App;
