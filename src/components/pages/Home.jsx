import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePage from "../content/SinglePage";
import Genres from "../content/Genres";
import Search from "../content/Search";
const Home = ({ setStoreId, inputValue }) => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [valuses, setvaluses] = useState("");
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState("");

  const getData = async () => {
    setLoader(true);
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
    const { data } = await axios.get(url);
    setMovies(data.results);
    setLoader(false);
  };
  const queryData = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${
                    valuses ? valuses : select
                  }&page=${page}&include_adult=false`
    const { data } = await axios.get(url);
    setMovies(data.results);
  };
  useEffect(() => {
    getData();
    if(select || valuses){
      queryData()
    }
  }, [select]);
  if (loader) return <div id="loader"></div>;
  return (
    <>
      <div className="home">
        <div className="heading">
          <h1 className="trending_movies">Trending movies</h1>
        </div>
        <div className="catetgory">
          <Genres setSelect={setSelect} />
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
          {movies.length ? (
            movies.map((movie) => {
              return (
                <SinglePage
                  setStoreId={setStoreId}
                  key={movie.id}
                  meadia_type={movie.media_type}
                  id={movie.id}
                  date={movie.first_air_date || movie.release_date}
                  img={movie.poster_path}
                  rateing={movie.vote_average}
                  title={
                    movie.original_title || movie.title || movie.original_name
                  }
                />
              );
            })
          ) : (
            <div className="err"> {valuses} is not found </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
