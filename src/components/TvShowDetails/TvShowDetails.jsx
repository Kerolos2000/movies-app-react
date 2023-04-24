import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Details from "../Details/Details";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function TvShowDetails() {
  const { id: pramsId } = useParams();

  let {
    details: details1,
    loader: loader1,
    callApi: fetchDetails,
  } = useAxios(
    `https://api.themoviedb.org/3/tv/${pramsId}?api_key=a51a2678a6ebc32710f900cff1862764&language=en-US`
  );

  let {
    details: details2,
    loader: loader2,
    error: error2,
    callApi: fetchSimilarTV,
  } = useAxios(
    `https://api.themoviedb.org/3/tv/${pramsId}/similar?api_key=a51a2678a6ebc32710f900cff1862764&language=en-US&page=1`
  );

  useEffect(() => {
    fetchDetails();
    fetchSimilarTV();
  }, [pramsId]);

  // console.log(details1);
  return (
    <>
      {loader1 || loader2 ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>{details1.name || details1.original_name}</title>
          </Helmet>
          <Details
            poster_path={details1.poster_path}
            name={details1.name || details1.original_name}
            backdrop_path={details1.backdrop_path}
            genres={details1?.genres}
            overview={details1.overview}
            vote_average={`vote average : ${details1.vote_average}`}
            vote_count={`vote average : ${details1.vote_count}`}
            production_companies={details1.production_companies}
            homepage={details1.homepage}
            details2={details2}
            pathX={"tvDetails"}
            rateX={"tv"}
            createRateForm={true}
          />
        </>
      )}
    </>
  );
}
