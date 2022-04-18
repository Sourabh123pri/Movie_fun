import React from "react";
import { useNavigate } from "react-router-dom";

const SinglePage = ({
  img,
  id,
  date,
  title,
  rateing,
  meadia_type,
  setStoreId,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card animate__animated animate__zoomIn"
        id={id}
        onClick={() => {
          setStoreId(id);
          navigate("/single");
        }}
      >
        <div className="img_section">
          <img
            src={
              img === null
                ? `https://www.movienewz.com/img/films/poster-holder.jpg`
                : `https://image.tmdb.org/t/p/w500${img}`
            }
            alt={title}
          />
        </div>
        <h3 className="movie_name text-center my-2"> {title} </h3>
        <p className="text-secondary"> {meadia_type} </p>
        <div className="movie_info">
          <h5> {date}</h5>
          <h5>
            <span
              className={
                rateing > 5 ? `badge badge-success` : `badge badge-warning`
              }
            >
              <i className="fa fa-star-o" aria-hidden="true"></i> {rateing}{" "}
            </span>{" "}
          </h5>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
