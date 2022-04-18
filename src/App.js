import React, { useState } from "react"; 
import {Routes, Route } from "react-router-dom";
import Footer from './components/utility/Footer'
import NavBar from './components/utility/NavBar'
import PageNot from './components/utility/PageNot'
import Home from "./components/pages/Home";
import Movie from "./components/pages/Movie";
import Tv from "./components/pages/Tv";
import SingleMovieDetials from "./components/content/SingleMovieDetials";
function App() {
  const [storeId, setStoreId] = useState(null)
  const [inputValue, setInputValue] = useState(null);

  return (
    <>
      <NavBar setInputValue={setInputValue} inputValue={inputValue} />
      <Routes>
        <Route  exact path="/" element={<Home setStoreId={setStoreId} inputValue={inputValue} />} />
        <Route  exact path="/movie" element={<Movie setStoreId={setStoreId}  inputValue={inputValue}/>} />
        <Route  exact path="/tv" element={<Tv setStoreId={setStoreId}  inputValue={inputValue}/>} />
        <Route   path="/single" element={<SingleMovieDetials storeId={storeId}  inputValue={inputValue}/>}/>
        <Route   path="*" element={<PageNot />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
