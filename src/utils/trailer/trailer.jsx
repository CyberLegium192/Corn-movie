import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
// import './trailer.css'
const TrailerMovie = () =>{
  const {imdbId} = useParams();
  const [trailer, setTrailer] = useState([0])
  
  useEffect(() => {
    movieTrailer(imdbId)
  }, [0])
  
  const movieTrailer = (imdbId) =>{
    const movieDetailsURL =
    `https://api.themoviedb.org/3/movie/${imdbId}/videos?api_key=cf26269a358b763332b2e7d79ba63ff3`
    fetch(movieDetailsURL)
    .then(resp => resp.json())
    .then(result => {
      setTrailer(result.results[0])
      console.log(result.results[0])
    })
  }
  
  
  const handleTrailer = () => {
    console.log('hallo')
    window.open(`https://www.youtube.com/watch?v=${trailer.key}`)
  }
  
  return(
    <button className='playButton' type='button' onClick={() => handleTrailer()}><i class='bx bx-play'></i></button> 
  )
}
export default TrailerMovie