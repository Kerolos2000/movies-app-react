import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let GetMoviesContext = createContext();

export default function GetMoviesContextProvider(props) {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [person, setPerson] = useState([]);
  const [all, setAll] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  function callApi(url, setArray) {
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        setArray(res.data);
        setLoader(false);
        // console.log(res.data)
      })
      .catch((err) => {
        setError(err);
        setLoader(false);
      });
  }

  useEffect(() => {
    callApi(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=a51a2678a6ebc32710f900cff1862764&page=1`,
      setMovies
    );
    callApi(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=a51a2678a6ebc32710f900cff1862764&page=1`,
      setTv
    );
    callApi(
      `https://api.themoviedb.org/3/trending/person/day?api_key=a51a2678a6ebc32710f900cff1862764&page=1`,
      setPerson
    );
    callApi(
      `https://api.themoviedb.org/3/trending/all/day?api_key=a51a2678a6ebc32710f900cff1862764&page=1`,
      setAll
    );
  }, []);

  return (
    <GetMoviesContext.Provider
      value={{
        movies,
        tv,
        person,
        all,
        loader,
        error,
        setMovies,
        setTv,
        setPerson,
        setAll,
        setLoader,
        setError,
      }}
    >
      {props.children}
    </GetMoviesContext.Provider>
  );
}
