import React, { useContext, useState } from "react";
import Card from "../Card/Card";
import CardLabel from "../CardLabel/CardLabel";
import { GetMoviesContext } from "../../context/GetMoviesContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Movies() {
  let { movies, loader, setMovies, setError, setLoader } =
    useContext(GetMoviesContext);
  let [current, setCurrent] = useState(1);
  let arr = [];
  arr.length = 10;
  arr.fill(1).map((el, i) => i + 1);

  function callApi(pageNumber) {
    setCurrent(pageNumber);
    setLoader(true);
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=a51a2678a6ebc32710f900cff1862764&page=${pageNumber}`
      )
      .then((res) => {
        setMovies(res.data);
        console.log(res);
        setLoader(false);
      })
      .catch((err) => {
        setError(err);
        setLoader(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>
      <div className="container">
        <div className="row g-3 py-2 mb-4 justify-content-center">
          <CardLabel text={"movies"} />
          {loader ? (
            <Loader />
          ) : (
            movies?.results?.map((el, i) => (
              <Card
                key={i}
                to={el.id}
                pathX={"movieDetails"}
                img={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${el.poster_path}`
                    : null
                }
                name={el.title || el.original_title || el.name}
                rate={el.vote_average.toFixed(1)}
              />
            ))
          )}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link
              className="page-link"
              onClick={() => {
                if (current > 1) {
                  callApi(current - 1);
                }
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </li>
          {arr.map((e, i) => (
            <li key={i} className="page-item">
              <Link
                className="page-link"
                onClick={() => {
                  callApi(i + 1);
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link"
              onClick={() => {
                if (current < arr.length) {
                  callApi(current + 1);
                }
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
