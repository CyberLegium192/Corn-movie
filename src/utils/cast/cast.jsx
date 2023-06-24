import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// SKELETONS LOADING
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './cast.css'
const Cast = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true)
  const [cast, setCast] = useState([])
  const {imdbId} = useParams();
  useEffect(() => {
    fetchCast(imdbId)
    setTimeout(() =>  {
      setIsLoading(false)
    }, 1500);
  }, [])
  // https://api.themoviedb.org/3/movie/213713/credits?api_key=cf26269a358b763332b2e7d79ba63ff3
  const fetchCast = (imdbId) => {
    const movieDetailsURL =
    `https://api.themoviedb.org/3/movie/${imdbId}/credits?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setCast(data.cast)
    })
  }
  const lastPostIndex = CurrentPage * PostPerPage;
  const firstPostIndex = lastPostIndex - PostPerPage;
  const currentPost = cast.slice(firstPostIndex, lastPostIndex);
  const CastMovie = currentPost.map((item) => {
    return(
      <>
      {isLoading ? <Skeleton animation="wave" borderRadius={50} width={65} height={65}/> :
        <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} className='cast-image'/>
      }
      </>
    )
  })
  
  return(
  <>
    <div className='cast-container'>
      <div className=' cast-wrapper'>
        <div className='showAllCast'>
          <h4>Cast</h4>
          <Link to=''>all cast</Link>
        </div>
        <div className='cast-image-container'>
        {CastMovie}
        </div>
      </div>
    </div>
  </>  
  )
  
}

export default Cast