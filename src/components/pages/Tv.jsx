import axios from "axios";
import React, { useState, useEffect } from "react";
import SinglePage from "../content/SinglePage";
import Search from "../content/Search";

const Tv = ({ setStoreId, inputValue }) => {
  const [tvData, setTvData] = useState([]);
  const [page, setPage] = useState(1);
  const [valuses, setvaluses] = useState("");
  const [loader, setLoader] = useState(false);
  const getTvData = async () => {
    setLoader(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    );
    setTvData(data.results);
    setLoader(false);
  };
  const queryData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${valuses}&page=${page}&include_adult=false`
    );
    setTvData(data.results);
  };
  useEffect(() => {
    getTvData();
  }, [page]);
  if (loader) return <div id="loader"></div>;
  return (
    <>
      <div className="tvPage">
        <div className="heading">
          <h1 className="trending_movies">Tv Showes</h1>
        </div>
        <div className="catetgory">
          {inputValue ? (
            <>
              <Search setvaluses={setvaluses} valuses={valuses} />{" "}
              <span
                className="animate__animated animate__lightSpeedInLeft search"
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
          {tvData.length ? (
            tvData.map((movie) => {
              return (
                <SinglePage
                  setStoreId={setStoreId}
                  key={movie.id}
                  img={movie.poster_path}
                  id={movie.id}
                  meadia_type={"Tv Showes"}
                  title={
                    movie.original_title || movie.title || movie.original_name
                  }
                  date={movie.first_air_date || movie.release_date}
                  rateing={movie.vote_average}
                />
              );
            })
          ) : (
            <div className="err"> {valuses} is not found </div>
          )}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {tvData.map((ele, index) => {
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

export default Tv;
