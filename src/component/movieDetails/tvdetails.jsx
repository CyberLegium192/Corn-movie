import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// SKELETONS LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Gendre from '../../utils/gendre/gendre.jsx'
import Cast from '../../utils/cast/cast.jsx'
import Semilir from '../../utils/semilir/semilir.jsx'
function TvDetails(props){
  const [Tv, setTv] = useState([])
  const [genres, setGenres] = useState([])
  const [runtime, setRuntime] = useState([])
  const [tvTrailer, setTvTrailer] = useState([0])
  const [cast, setCast] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(5);
  const {imdbId} = useParams();
  const lastPostIndex = CurrentPage * PostPerPage;
  const firstPostIndex = lastPostIndex - PostPerPage;
  const currentPost = cast.slice(firstPostIndex, lastPostIndex);
  const poster = `https://image.tmdb.org/t/p/original/${Tv.backdrop_path}`
  const posterPath = `https://image.tmdb.org/t/p/original/${Tv.poster_path}`
  
  useEffect(() => {
    fetchTv(imdbId)
    fetchCast(imdbId)
    TvTrailer(imdbId)
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1500);
  }, [])
  
  const fetchTv = (imdbId) => {
    const movieDetailsURL =
    `https://api.themoviedb.org/3/tv/${imdbId}?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(result => {
      setTv(result)
      setGenres(result.genres)
      setRuntime(result.episode_run_time)
    })
  }
  const genre = genres.map((item) => {
    return <p className='gendre'>{item.name}</p>
  })
  
  // FETCH CAST TV AND MAPPING ARRAY
  const fetchCast = (imdbId) => {
    const movieDetailsURL =
    `https://api.themoviedb.org/3/tv/${imdbId}/credits?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(data => {
      setCast(data.cast)
    })
  }
  
  const Cast = currentPost.map((item) => {
    return(
     <>
      {isLoading ? <Skeleton animation="wave" borderRadius={50} width={65} height={65}/> :
      <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} className='cast-image'/>
      }
    </>
    )
  })
  const TvTrailer = (imdbId) =>{
    const movieDetailsURL =
    `https://api.themoviedb.org/3/tv/${imdbId}/videos?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(result => {
      setTvTrailer(result.results[0])
      console.log(result.results[0])
    })
  }
  const handleTrailer = () => {
    window.open(`https://www.youtube.com/watch?v=${tvTrailer.key}`)
  }
  
  var fixrate = Tv.vote_average
  var rating = Math.floor(fixrate*100)/100
  
  return(
    <>
      <div className='background-poster' key={Tv.id}>
      {isLoading ? <Skeleton animation="wave" width={500} height={260}/> :
       <img src={poster} alt={Tv.title}/>
      }
      </div>
      <Link to='/' className='back'><i class='bx bx-chevron-left'></i></Link>
      
      
      <div className='overview-container'>
        <div className="overview-wrapper">
          <button className='playButton' type='button' onClick={() => handleTrailer()}><i class='bx bx-play'></i></button>
          
          
          
          
          <div className='title-rate'>
            <div className='left-poster'>
              {isLoading ? <Skeleton variant="rounded" animation="wave"
              width={98} height={140} style={{borderRadius: '8px'}}/> :
               <img src={posterPath} alt={Tv.name} className='left-poster-poster'/>
              }
            </div>
            <div className='right'>
              <p className='title-name'>{Tv.name}</p>
              <div className='rating'>
                <span><i class='bx bxs-star'></i></span>
                <p className='rate'>{rating}</p>
              </div>
              {genre}
              <div className='runtime-release'>
                <p className='date'>{Tv.last_air_date}</p>
                <div className='runtime'>
                  <span><i class='bx bx-play'></i></span>
                  <p className='total'>{Tv.episode_run_time}mins</p>
                </div>
              </div>
            </div>
            
          </div>
          
          {isLoading ? 
          <div className='overview-text'>
          <Skeleton variant="text" animation="wave" count={5}/>
          </div>
          :
            <p className='overview-text'>{Tv.overview}</p>
          }
        </div>
      </div>
      
      
      
      <div className='cast-container'>
        <div className=' cast-wrapper'>
          <div className='showAllCast'>
            <h4>Cast</h4>
            <Link to=''>all cast</Link>
          </div>
          <div className='cast-image-container'>
          {Cast}
          </div>
        </div>
      </div>
      
      
      <div className='semilar-container'>
        <div className='semilar-wrapper '>
          <Semilir />
        </div>
      </div>
      
    </>
  )
}
export default TvDetails