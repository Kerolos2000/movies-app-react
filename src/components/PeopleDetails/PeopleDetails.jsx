import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

import Details from "../Details/Details";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function PeopleDetails() {
  let [prams, setPrams] = useState(useParams());

  let {
    details: details1,
    loader: loader1,
    error: error1,
  } = useAxios(
    `https://api.themoviedb.org/3/person/${prams.id}?api_key=a51a2678a6ebc32710f900cff1862764&language=en-US`
  );

  return (
    <>
      {loader1 ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>{details1.name}</title>
          </Helmet>
          <Details
            poster_path={details1.profile_path}
            name={details1.name}
            also_known_as={details1.also_known_as}
            biography={details1.biography}
            place_of_birth={details1.place_of_birth}
            gender={details1.gender}
            birthday={details1.birthday}
            deathday={details1.deathday}
            known_for_department={details1.known_for_department}
            homepage2={details1.homepage}
          />
        </>
      )}
    </>
  );
}
