import React, { useState, useEffect } from "react";
import axios from "axios";

const Genres = ({ setSelect }) => {
  const [gen, setGen] = useState([]);
  const getGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
    );
    setGen(data.genres);
  };
  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      {gen.map((names, index) => (
        <span
          key={index}
          onClick={(e) => {
            setSelect(e.target.innerText);
          }}
          className="badge badge-pill badge-secondary"
        >
          {names.name}
        </span>
      ))}
    </>
  );
};

export default Genres;
