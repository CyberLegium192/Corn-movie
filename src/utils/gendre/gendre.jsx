import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
const Gendre = () => {
  const [genres, setGenres] = useState([])
  
  const {imdbId} = useParams();
  useEffect(() => {
    gendre(imdbId)
  }, [])
  const gendre = (imdbId) =>{
    const movieDetailsURL =
    `https://api.themoviedb.org/3/movie/${imdbId}/videos?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(result => {
      setGenres(result.genres)
    })
  }
      // {genres.map((item)=> <p className='gendre'> {item.name}</p>)}
  return(
    <>
    </>
  )
}
export default Gendre