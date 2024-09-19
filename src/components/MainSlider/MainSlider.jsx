import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./MainSlider.module.css";
export default function MainSlider({ dataFromApi, pathX, home }) {
  let [data, setData] = useState(dataFromApi);

  return (
    <>
      <Swiper
        spaceBetween={5}
        slidesPerView={7}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        freeMode={true}
        modules={[FreeMode, Autoplay]}
        breakpoints={{
          280: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 5,
          },
        }}
      >
        {dataFromApi?.results?.map((el, i) => (
          <SwiperSlide key={i}>
            {el.poster_path ? (
              <img
                className={style.SecondSliderImg}
                src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                alt=".."
              />
            ) : (
              <div className={style.img}></div>
            )}
            {home ? null : (
              <Link to={`/${pathX}/${el.id}`}>
                <p className="small m-0">
                  {(el.title || el.original_title || el.name)
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </p>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
