import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import style from "./Details.module.css";
import MainSlider from "../MainSlider/MainSlider";
import MainBtn from "../MainBtn/MainBtn";
import axios from "axios";

export default function Details({
  poster_path,
  title,
  backdrop_path,
  genres,
  overview,
  vote_average,
  vote_count,
  production_companies,
  release_date,
  homepage,
  details2,
  pramsId,

  pathX,
  rateX,
  createRateForm,

  profile_path,
  name,
  also_known_as,
  biography,
  place_of_birth,
  gender,
  birthday,
  deathday,
  known_for_department,
  homepage2,
}) {
  const [islaoding, setIslaoding] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a51a2678a6ebc32710f900cff1862764`
      )
      .then((res) => {
        setGuestSessionId(res.data.guest_session_id);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=a51a2678a6ebc32710f900cff1862764`
      )
      .then((res) => {
        setToken(res.data.request_token);
      });
  }, []);

  function sendDataToapi(data) {
    setIslaoding(true);
    setError(null);
    axios
      .post(
        `https://api.themoviedb.org/3/${rateX}/${pramsId}/rating?api_key=a51a2678a6ebc32710f900cff1862764&guest_session_id=${guestSessionId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIslaoding(false);
        setIsRated(true)
      })
      .catch((error) => {
        setError(error.response.data.status_message);
        setIslaoding(false);
      });
  }

  let myValidation = Yup.object({
    value: Yup.string()
      .required("Your Rate is Required")
      .matches(/^(10|[0-9])$/, "Your Rating to be Between 0 and 10"),
  });

  let formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: myValidation,
    onSubmit: sendDataToapi,
  });

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className={`col-md-6 ${style.left}`}>
            {poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
              />
            )}
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
              />
            )}
            {!poster_path && !profile_path && <div className={style.img}></div>}
            {also_known_as && (
              <p className="h6 mt-2">
                also known as :{" "}
                {also_known_as?.map((els, i) => (
                  <span key={i} className="badge bg-info p-2 m-1 fs-6">
                    {els}
                  </span>
                ))}
              </p>
            )}
            {place_of_birth && (
              <p className="h6">place of birth : {place_of_birth}</p>
            )}
            {birthday && <p className="h6">birthday : {birthday}</p>}
            {deathday && <p className="h6">deathday : {deathday}</p>}
            {gender && (
              <p className="h6">gender : {gender == 2 ? "mail" : "femail"}</p>
            )}
            {known_for_department && (
              <div className="h6">
                known for department :{" "}
                <span className="badge bg-success p-2 m-1 fs-6">
                  {known_for_department}
                </span>
              </div>
            )}
            {homepage2 && (
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <Link className="button-text" target="_blank" to={homepage2}>
                  home page
                </Link>
              </button>
            )}
          </div>

          <div className={`col-md-6 ${style.right}`}>
            {backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                alt=""
              />
            )}
            {title && <p className="h2">{title}</p>}
            {name && <p className="h2">{name}</p>}
            <div className="d-flex flex-wrap">
              {genres &&
                genres?.map((els, i) => (
                  <span key={i} className="badge bg-info p-2 m-1 fs-6">
                    {els.name}
                  </span>
                ))}
            </div>
            {overview && <p className="h6">{overview}</p>}
            {biography && (
              <p className={`h6 ${style.biography}`}>{biography}</p>
            )}
            <div className="d-flex">
              {vote_average && <p className="h6 m-0 me-3">{vote_average}</p>}
              {vote_count && <p className="h6 m-0">{vote_count}</p>}
            </div>
            {production_companies && production_companies.length > 0 && (
              <p>
                production companies :{" "}
                {production_companies?.map((el) => el.name).join(" | ")}
              </p>
            )}
            {release_date && <p>{release_date}</p>}
            {createRateForm && !isRated && (
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex">
                  <input
                    className="form-control me-2 w-25"
                    type="number"
                    min={0}
                    max={10}
                    id="value"
                    name="value"
                    onChange={(e) => {
                      setError(null);
                      formik.handleChange(e);
                    }}
                    value={formik.values.value}
                    onBlur={formik.handleBlur}
                  />
                  {islaoding ? (
                    <MainBtn
                      theam={"main-btn"}
                      icon={"fa-solid fa-spinner fa-spin-pulse"}
                      text={"loading"}
                      type={"button"}
                    />
                  ) : (
                    <MainBtn
                      theam={"main-btn w-100"}
                      text={"Submit"}
                      type={"submit"}
                    />
                  )}
                </div>
                {formik.errors.value && formik.touched.value ? (
                  <div className="alert">{formik.errors.value}</div>
                ) : null}
                {error ? <div className="alert h6 fw-bol">{error}</div> : null}
              </form>
            )}

            {homepage && (
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <Link className="button-text" target="_blank" to={homepage}>
                  home page
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container my-3">
        {details2 && <MainSlider dataFromApi={details2} pathX={pathX} />}
      </div>
    </>
  );
}
