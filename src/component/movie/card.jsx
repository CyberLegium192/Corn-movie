// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

// SKELETONS LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {useState, useEffect, useRef, Suspense} from 'react'
import {Link} from 'react-router-dom'
import './card.css'
import CardLoading from '../../utils/cardLoading/cardLoading.jsx'

const Card = () => {
  const [CardMovie, setCardMovie] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1800);
      cardList()
  },[])
  
  
  const cardList = () => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=cf26269a358b763332b2e7d79ba63ff3")
    .then(mem => mem.json())
    .then(result => {
      setCardMovie(result.results)
      console.log(result.results)
    })
  }
  
  const cardMovie = CardMovie.map((item) => {
    const poster = 'https://image.tmdb.org/t/p/w185/'
    
    return(
      <SwiperSlide>
      {isLoading ? <CardLoading /> :
        <Link to={`/${item.id}`} className='cardMovie' key={item.id}>
          <img src={`${poster}${item.poster_path}`} className='poster'/>
          <div className='title'>
            <p>{item.title}</p>
          </div>
        </Link>
      }
      </SwiperSlide>
    )
  })

  return (
    <>
      <h3 className='title-header2'>Popular movie</h3>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        >
        <Suspense fallback={<CardLoading />}>
         {cardMovie}
        </Suspense >
        </Swiper>
        
    </>
  )  
}
export default Card