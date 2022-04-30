import axios from "axios";
import React, { useEffect, useState } from "react";

const Carousel = ({storeId}) => {
  const [castes, setCastes] = useState([]);
  const fetchCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${storeId}/credits?api_key=f8829ed52383e5897f7c45b1475ffe79&language=en-US`
    );
    setCastes(data.cast);
  };
  useEffect(() => {
    fetchCast();
  }, []);

  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner" style={{ display: "flex" }}>
          {castes.map((cast) => {
            return (
              <div className="carousel-item active"  key={cast.id}>
                <img className="carouselImg" 
                  title={cast.name}
                  src={
                    cast.profile_path === null
                      ? `https://www.movienewz.com/img/films/poster-holder.jpg`
                      : `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                  }
                  alt={cast.name}
                />
                <p className="text-center" style={{marginBottom:'0px'}}>{cast.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;


