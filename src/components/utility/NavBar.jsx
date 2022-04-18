import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({setInputValue,inputValue}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="nav ">
        <div className="logo" onClick={()=> window.scroll(0,0)} ><Link to="/"><i className="fa fa-film" aria-hidden="true"></i> Movie Fun</Link>{" "}</div>
        <div className="bar"onClick={() => {show ? setShow(false) : setShow(true);}}> {show ? <i className="fa fa-times" aria-hidden="true"></i>:<i className="fa fa-bars " aria-hidden="true"></i> }
        </div>
      </div>
      {show ? (
        <div className="NavBar animate__animated animate__slideInLeft ">
          <ul>
            <li><i className="fa fa-home" aria-hidden="true"></i><Link to="/">Home</Link></li>
            <li><i className="fa fa-film" aria-hidden="true"></i><Link to="/movie">Movie</Link></li>
            <li><i className="fa fa-television" aria-hidden="true"></i><Link to="/tv">Tv Show </Link></li>
            <li><i className="fa fa-envelope-o"></i><Link to="/contact">Contact</Link></li>
            <li  onClick={()=>{inputValue ? setInputValue(false) :setInputValue(true) }} style={{cursor:"pointer "}}> <i className="fa fa-search" aria-hidden="true"></i>Search Movie/Tv</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default NavBar;
