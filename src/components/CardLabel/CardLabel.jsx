import React from "react";
import style from "./CardLabel.module.css";

export default function CardLabel({text}) {
  return (
    <>
      <div className={`${style.allCardLabel} col-xl-4 col-lg-6 col-md-8  my-5`}>
        <div className={`${style.card}`}>
          <div className={`${style.textOne}`}>
            <p className="h2">Trending</p>
            <p className="h2">{text}</p>
            <p className="h2">to watch now</p>
          </div>
          <p className={`${style.textTwo} text-muted `}>
            most watched movies by days
          </p>
        </div>
      </div>
    </>
  );
}
