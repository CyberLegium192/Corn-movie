// IMPORT SWIPER JS
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Keyboard, Autoplay } from "swiper";

// SKELETONS LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./trailer.css";
const Trailer = () => {
  const [CardMovie, setCardMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(7);
  
  useEffect(() => {
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1800);
    slideMovieHeader();
  }, []);
  const slideMovieHeader = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=cf26269a358b763332b2e7d79ba63ff3"
    )
      .then((mem) => mem.json())
      .then((result) => {
        setCardMovie(result.results);
        console.log(result.results);
      });
  };
  // MOVIE MMAPPING Array
  const lastPostIndex = CurrentPage * PostPerPage;
  const firstPostIndex = lastPostIndex - PostPerPage;
  const currentPost = CardMovie.slice(firstPostIndex, lastPostIndex);

  
  const slideMovie = currentPost.map((item) => {
    var fixrate = item.vote_average;
    var rating = Math.floor(fixrate * 100) / 100;
    const poster = "https://image.tmdb.org/t/p/original/";
    
    
    return (
      <SwiperSlide>
      {isLoading ? 
      <div className='contianer-movie-header'>
      <Skeleton animation="wave" width={500} height={270}/> 
      </div>
      :
        <Link to={`/${item.id}`} key={item.id} className="contianer-movie-header" >
          <img src={`${poster}${item.backdrop_path}`} className="slide-image" />
          <div className="title-slide">
            <p className="nameSlide">{item.title}</p>

            <div className="slide-date">
              <div>{item.release_date}</div>
              <span>
                <i class="bx bxs-star"></i>
                <p>{rating}</p>
              </span>
            </div>
          </div>
        </Link>
        }
      </SwiperSlide>
    );
  });

  // RETURN ALL
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        keyboard={{
          enable: true,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Keyboard, Autoplay]}
        className="mySwiper"
      >
        {slideMovie}
      </Swiper>
    </>
  );
};
export default Trailer;
