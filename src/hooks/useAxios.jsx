import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useAxios(url) {
  const [details, setDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  function callApi() {
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        setLoader(false);
        setDetails(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoader(false);
      });
  }

  useEffect(() => {
    callApi();
  }, []);

  return { details, setDetails, loader, setLoader, error, setError, callApi };
}
