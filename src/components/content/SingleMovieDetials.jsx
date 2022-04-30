import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";

const SingleMovieDetials = ({ storeId }) => {
  const navigate = useNavigate();
  const [singleMovie, setSingleMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const singleMovieData = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${storeId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
      );
      setSingleMovie(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      alert("Not found this movie");
      navigate("/");
    }
  };
  useEffect(() => {
    singleMovieData();
    // react-hooks/exhaustive-deps
  }, []);

  if (loader) return <div id="loader"></div>;
  return (
    <>
      <div className="single_movie_detials animate__animated animate__slideInUp">
        <a href={singleMovie.homepage} target="_blank">
          <div className="single_card">
            <div className="single_img_section">
              <img
                src={
                  singleMovie.backdrop_path === null
                    ? `https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg`
                    : `https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`
                }
                alt={singleMovie.original_title}
              />
            </div>
            <div className="single_movie_info ">
              <h3>
                {" "}
                <b> {singleMovie.original_title || singleMovie.title}</b>
              </h3>
              <p>
                Overview :-{" "}
                <span className="text-muted"> {singleMovie.overview}</span>
              </p>
              <div>
                Making cost :- {singleMovie.budget && singleMovie.budget}
                <i className="fa fa-inr" aria-hidden="true"></i>
              </div>
              <p>
                <b>Release Status :- </b>{" "}
                <span
                  className={
                    singleMovie.status === `Released`
                      ? `badge badge-success`
                      : `badge badge-warning`
                  }
                >
                  {singleMovie.status}
                </span>
              </p>
              <div>
                <div>
                  {" "}
                  <i
                    className="fa fa-calendar-check-o"
                    aria-hidden="true"
                  ></i>{" "}
                  Release Date :- {singleMovie.release_date}
                </div>
                {singleMovie.revenue ? (
                  <div>
                    <i className="fa fa-money" aria-hidden="true"></i>Earning
                    Money :- {singleMovie.revenue}
                    <i className="fa fa-inr" aria-hidden="true"></i>
                  </div>
                ) : null}
                <div>
                  {" "}
                  <i className="fa fa-clock-o" aria-hidden="true"></i> Time :-{" "}
                  {singleMovie.runtime} min
                </div>
                {singleMovie.spoken_languages && (
                  <div>
                    {" "}
                    <i className="fa fa-language" aria-hidden="true"></i> Lang
                    :- {singleMovie.spoken_languages[0].english_name}
                  </div>
                )}
              </div>

              <p>
                {singleMovie.genres &&
                  singleMovie.genres.map((names, index) => (
                    <span key={index} className="badge badge-light mx-1">
                      {names.name}
                    </span>
                  ))}
              </p>
              <p>{singleMovie.tagline}</p>
              <p>
                <span
                  className={
                    singleMovie.vote_average > 5
                      ? `badge badge-success`
                      : `badge badge-warning`
                  }
                >
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                  {singleMovie.vote_average}
                </span>
              </p>
            </div>
          </div>
        </a>
        <Carousel storeId={storeId} />
        <div className="text-center">
          <button
            type="button"
            className="btn btn-success "
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleMovieDetials;
