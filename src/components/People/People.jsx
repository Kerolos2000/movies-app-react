import React, { useContext, useState } from "react";
import Card from "../Card/Card";
import CardLabel from "../CardLabel/CardLabel";
import { GetMoviesContext } from "../../context/GetMoviesContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function People() {
  let { person, loader, setPerson, setError } = useContext(GetMoviesContext);
  let [current, setCurrent] = useState(1);
  let arr = [];
  arr.length = 10;
  arr.fill(1).map((el, i) => i + 1);

  function callApi(pageNumber) {
    setCurrent(pageNumber);
    axios
      .get(
        `https://api.themoviedb.org/3/trending/person/day?api_key=a51a2678a6ebc32710f900cff1862764&page=${pageNumber}`
      )
      .then((res) => {
        setPerson(res.data);
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <>
      <Helmet>
        <title>People</title>
      </Helmet>
      <div className="container">
        <div className="row g-3 py-2 mb-4 justify-content-center">
          <CardLabel text={"tv"} />
          {loader ? (
            <Loader />
          ) : (
            person?.results?.map((el, i) => (
              <Card
                key={i}
                to={el.id}
                pathX={"peopleDetails"}
                img={
                  el.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${el.profile_path}`
                    : null
                }
                name={el.name}
                rate={el.popularity.toFixed(0)}
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
