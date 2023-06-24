import {useEffect, useState, useRef} from 'react'
import {useParams, Link} from 'react-router-dom'
import './semilar.css'

// IMPORT SKELETON LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper";

const SimilarMovie = () => {
  const [semilar, setSemilar] = useState([])
  const {imdbId} = useParams();
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchSemilar(imdbId)
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1500);
  })
  const fetchSemilar = (imdbId) => {
    const semilarURL = `https://api.themoviedb.org/3/movie/${imdbId}/similar?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(semilarURL)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data.results)
      setSemilar(data.results)
    })
  }
  
  
  const poster = 'https://image.tmdb.org/t/p/original/'
  return(
  <>
  <h4 className='semilarTitle'>Semilar</h4>
  <Swiper
    slidesPerView={3}
    spaceBetween={0}
    loop={true}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
     pagination={{
      dynamicBullets: true,
    }}
    modules={[Pagination, Autoplay]}
    className="mySwiper"
    >
  
    {semilar.map((item) => 
    <SwiperSlide>
    {isLoading ? <Skeleton variant="rounded" animation="wave" width={100} height={190} style={{borderRadius: '5px', marginLeft:'5px'}}/> :
      <a href={`/${item.id}`} className='cardMoviesimilar' key={item.id}>
        <img src={`${poster}${item.poster_path}`} className='poster'/>
         <div className='title-semilar'>
          <p>{item.title}</p>
        </div>
      </a>
    }
    </SwiperSlide>
    )
    }
    
   </Swiper>
  </>  
  )
}

export default SimilarMovie