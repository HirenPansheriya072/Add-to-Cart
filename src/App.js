import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./Styles/App.scss";
import "./Styles/Header.scss";
import "./Styles/Home.scss";
import "./Styles/Cart.scss";
import "./Styles/MediaQuery.scss";


import Home from './Components/Home';
import Header from './Components/Header';
import Cart from './Components/Cart';


const App = () => {
  return(
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};



export default App;