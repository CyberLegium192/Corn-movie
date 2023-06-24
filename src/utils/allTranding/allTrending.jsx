import {useParams, Link} from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

// SKELETONS LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {useState, useEffect} from 'react'
import CardLoading from '../cardLoading/cardLoading.jsx'

const AllTrending = () => {
  const [CardMovie, setCardMovie] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState(1)
  
  
  
  useEffect(() => {
    cardList(pagination)
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1800);
      handlePrev(pagination)
      handleNext(pagination)
  },[])
  
  const handleNext = (pagination) => {
    setPagination(pagination + 1)
    console.log(pagination)
  }
  const handlePrev = (pagination) => {
    if (pagination !== 1) {
      setPagination(pagination - 1)
    }
    console.log(pagination)
  }
  
  
  const cardList = (pagination) => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=cf26269a358b763332b2e7d79ba63ff3&language=en-US&page=${pagination}`)
    .then(mem => mem.json())
    .then(result => {
      setCardMovie(result.results)
      console.log(result.results)
    })
  }
  
  const cardMovie = CardMovie.map((item) => {
    const poster = 'https://image.tmdb.org/t/p/original/'
    
    return(
      <>
      {isLoading ? <CardLoading /> :
        <Link to={`/${item.id}`} className='w-36 h-56 rounded-lg overflow-hidden
        relative' key={item.id}>
          <img src={`${poster}${item.poster_path}`} className='poster'/>
          <div className='title2 w-36'>
            <p>{item.title}{item.name}</p>
          </div>
        </Link>
      }
    </>
    )
  })
  
  return(
  <>
    <h4 className='title-type text-2xl capitalize px-6 py-3'>all populer</h4>
    
    <div className='w-full'>
      <div className='flex flex-wrap justify-center gap-3'>
       {cardMovie}
      </div>
    </div>
    
    <div className='flex justify-center py-8'>
      <div className="join grid grid-cols-2 w-64">
        <button className="join-item btn btn-outline text-xs  btn-sm" onClick={handlePrev}>Previous page</button>
        <button className="join-item btn btn-outline text-xs  btn-sm" onClick={handleNext}>Next</button>
      </div>
    
    </div>
  </>  
    
    
    
  )
}
export default AllTrending