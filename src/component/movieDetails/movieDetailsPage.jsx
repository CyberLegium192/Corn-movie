import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// SKELETONS LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// IMPORT COMPONENT
import MovieList from '../movie/movieList.jsx'
import Gendre from '../../utils/gendre/gendre.jsx'
import Cast from '../../utils/cast/cast.jsx'
import TrailerMovie from '../../utils/trailer/trailer.jsx'
import SimilarMovie from '../../utils/semilir/semilarMovie.jsx'

import "./detailsMovie.css"
function MovieDetailsPage(props) {
  const {imdbId} = useParams();
  const [movieDetails, setMovieDetails] = useState([])
  const [trailer, setTrailer] = useState([])
  const [movie, setMovie] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const poster = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
  const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
  
  useEffect(() => {
    fetchMovieTmdb(imdbId)
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1500);
  }, [])
  const fetchMovieTmdb = (imdbId) => {
    const movieDetailsURL =
    `https://api.themoviedb.org/3/movie/${imdbId}?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(result => {
      setMovie(result)
      console.log(result)
    })
  }
  
  var fixrate = movie.vote_average
  var rating = Math.floor(fixrate*100)/100
  
  return(
    <>
    
      <div className='background-poster' key={movie.id}>
      {isLoading ? <Skeleton animation="wave" width={500} height={260}/> :
       <img src={poster} alt={movie.title}/>
      }
      </div>
      <Link to='/' className='back'><i class='bx bx-chevron-left'></i></Link>
      
      
      
      <div className='overview-container'>
        <div className="overview-wrapper">
          <TrailerMovie />
          
          
          <div className='title-rate'>
            <div className='left-poster'>
              {isLoading ? <Skeleton variant="rounded" animation="wave"
              width={100} height={140} style={{borderRadius: '8px'}}/> :
               <img src={posterPath} alt={movie.title} className='left-poster-poster'/>
              }
            </div>
            <div className='right'>
              <p className='title-name'>{movie.title}</p>
              <div className='rating'>
                <span><i class='bx bxs-star'></i></span>
                <p className='rate'>{rating}</p>
              </div>
              <Gendre />
              <div className='runtime-release'>
                <p className='date'>{movie.release_date}</p>
                <div className='runtime'>
                  <span><i class='bx bx-play'></i></span>
                  <p className='total'>{movie.runtime}mins</p>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? 
          <div className='overview-text'>
          <Skeleton variant="text" animation="wave" count={5}/>
          </div>
          :
            <p className='overview-text'>{movie.overview}</p>
          }
        </div>
      </div>
      
      <Cast />
      
      <div className='semilar-container'>
        <div className='semilar-wrapper'>
          <SimilarMovie />
        </div>
      </div>
      
      
    </>
  )
}
export default MovieDetailsPage