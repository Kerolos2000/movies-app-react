import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
export default function Card({ img, name, rate, pathX, to }) {
  return (
    <>
      <div
        className={`${style.allCard} col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6`}
      >
        <div className={`${style.card}`}>
          {img ? (
            <img
              src={img}
              className={`${style.img} w-100`}
              alt={name}
              loading="lazy"
            />
          ) : (
            <div className={style.img}></div>
          )}
          {name && (
            <Link to={`/${pathX}/${to}`}>
              <p className="small">{name}</p>
            </Link>
          )}
        </div>
        {rate && (
          <div className={`${style.rate}`}>
            <p>{rate}</p>
          </div>
        )}
      </div>
    </>
  );
}
