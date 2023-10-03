import Details from "../Details/Details";
import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function MovieDetails() {
  const { id: pramsId } = useParams();

  const {
    details: details1,
    loader: loader1,
    callApi: fetchDetails,
  } = useAxios(
    `https://api.themoviedb.org/3/movie/${pramsId}?api_key=a51a2678a6ebc32710f900cff1862764&language=en-US`
  );

  const {
    details: details2,
    loader: loader2,
    callApi: fetchSimilarMovies,
  } = useAxios(
    `https://api.themoviedb.org/3/movie/${pramsId}/similar?api_key=a51a2678a6ebc32710f900cff1862764&language=en-US&page=1`
  );

  useEffect(() => {
    fetchDetails();
    fetchSimilarMovies();
  }, [pramsId]);

  return (
    <>
      {loader1 || loader2 ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>{details1.title || details1.original_title}</title>
          </Helmet>
          <Details
            poster_path={details1.poster_path}
            title={details1.title || details1.original_title}
            backdrop_path={details1.backdrop_path}
            genres={details1?.genres}
            overview={details1.overview}
            vote_average={`vote average : ${details1.vote_average}`}
            vote_count={`vote average : ${details1.vote_count}`}
            production_companies={details1.production_companies}
            release_date={details1.release_date ? `release date : ${details1.release_date}` : null}
            homepage={details1.homepage}
            details2={details2}
            pathX={"movieDetails"}
            rateX={"movie"}
            pramsId={pramsId}
            createRateForm={true}
          />
        </>
      )}
    </>
  );
}
