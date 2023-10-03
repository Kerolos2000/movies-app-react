import React, { useContext } from "react";
import Card from "../Card/Card";
import CardLabel from "../CardLabel/CardLabel";
import { GetMoviesContext } from "../../context/GetMoviesContext";
import img from "../../img/Fotor_AI.png";
import style from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Home() {
  let { movies, tv, person, all, loader } = useContext(GetMoviesContext);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={style.maimSlider}>
        <img src={img} alt="" />
        <div className={`container ${style.containerx}`}>
          <p className={`h1 fw-bold ${style.title}`}>Our Latest Trending</p>
          <MainSlider
            isLink={true}
            dataFromApi={all}
            pathX={"movieDetails"}
            home={true}
          />
        </div>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row g-3 py-2 mb-4">
            <CardLabel text={"movies"} />
            {movies?.results?.slice(0, 10).map((el, i) => (
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
            ))}
          </div>
          <div className="row g-3 py-2">
            <CardLabel text={"tv"} />
            {tv?.results?.slice(0, 10).map((el, i) => (
              <Card
                key={i}
                to={el.id}
                pathX={"tvDetails"}
                img={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${el.poster_path}`
                    : null
                }
                name={el.title || el.original_title || el.name}
                rate={el.vote_average.toFixed(1)}
              />
            ))}
          </div>
          <div className="row g-3 py-2">
            <CardLabel text={"person"} />
            {person?.results?.slice(0, 10).map((el, i) => (
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
            ))}
          </div>
        </div>
      )}
    </>
  );
}
