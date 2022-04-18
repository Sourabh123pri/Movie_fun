import axios from "axios";
import React, { useState, useEffect } from "react";
import SinglePage from "../content/SinglePage";
import Search from "../content/Search";

const Movie = ({ setStoreId, inputValue }) => {
  const [movieData, setMovieData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [valuses, setvaluses] = useState("");

  const getMovie = async () => {
    setLoader(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    );
    setLoader(true);
    setMovieData(data.results);
    setLoader(false);
  };
  const queryData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${valuses}&page=${page}&include_adult=false`
    );
    setMovieData(data.results);
  };
  useEffect(() => {
    getMovie();
  }, [page]);
  if (loader) return <div id="loader"></div>;
  return (
    <>
      <div className="movePage">
        <div className="heading">
          <h1 className="trending_movies">Movies</h1>
        </div>
        <div className="catetgory">
          {inputValue ? (
            <>
              <Search setvaluses={setvaluses} valuses={valuses} />{" "}
              <span
                className="search animate__animated animate__lightSpeedInLeft"
                onClick={() => {
                  queryData();
                }}
              >
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </span>
            </>
          ) : null}
        </div>
        <div className="card_group text-capitalize">
          {movieData.length ? (
            movieData.map((movie) => {
              return (
                <SinglePage
                  setStoreId={setStoreId}
                  key={movie.id}
                  img={movie.poster_path}
                  id={movie.id}
                  meadia_type={"Movie"}
                  title={
                    movie.original_title || movie.title || movie.original_name
                  }
                  date={movie.first_air_date || movie.release_date}
                  rateing={movie.vote_average}
                />
              );
            })
          ) : (
            <div className="err"> {valuses} movie is not found </div>
          )}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {movieData.map((ele, index) => {
              return (
                <li
                  className="page-item page-link mx-1 "
                  key={index}
                  onClick={(e) => setPage(+e.target.textContent)}
                >
                  {index + 1}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Movie;
