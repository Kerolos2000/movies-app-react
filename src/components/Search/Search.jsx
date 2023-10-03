import React, { useContext, useEffect } from "react";
import CardLabel from "../CardLabel/CardLabel";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import { GetMoviesContext } from "../../context/GetMoviesContext";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Search() {
  const { id: pramsId } = useParams();

  const {
    details: details1,
    loader: loader1,
    callApi: fetchDetails,
  } = useAxios(
    `https://api.themoviedb.org/3/search/multi?api_key=a51a2678a6ebc32710f900cff1862764&language=en-US&query=${pramsId}&page=1&include_adult=false`
  );
  console.log(details1);
  useEffect(() => {
    fetchDetails();
  }, [pramsId]);

  return (
    <>
      <Helmet>
        <title>{pramsId}</title>
      </Helmet>
      {loader1 ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row g-3 py-2 mb-4">
            <CardLabel text={"movies, tv and people"} />
            {details1?.results?.map((el, i) => (
              // console.log(details1?.results)
              <Card
                key={i}
                to={el.id}
                pathX={el.media_type === "movie" ? "movieDetails" : "tvDetails"}
                img={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${el.poster_path}`
                    : null
                }
                name={el.original_title || el.title || el.name}
                rate={el.vote_average ? el.vote_average?.toFixed(1) : null}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
