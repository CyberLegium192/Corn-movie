import {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import './movieList.css'
function MovieList() {
  const [searchTerm , setSearchTerm] = useState('')
  const [MovieDetails , setMovieDetails] = useState([])
  const [CardMovie, setCardMovie] = useState([])
  const [MovieFound , setMovieFound] = useState(false)
  
  
  useEffect(() => {
    let term = localStorage.getItem("searchTerm")
    if(term){
      fetchMovie(term)
    }
      console.log(MovieDetails)
  },[])
  
  const displayMovie = useRef()
  // const notFound = useRef()
  const clearMovie = () =>{
    displayMovie.current.classList.remove('active')
    localStorage.removeItem('searchTerm')
    setSearchTerm()
    setMovieDetails([])
  }
  // FETCHING DATA API
  const fetchMovie = (movieName) => {
    const tes = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=cf26269a358b763332b2e7d79ba63ff3`
    // notFound.current.classList.add('active')
    if(movieName.length > 3){
      displayMovie.current.classList.add('active')
      localStorage.setItem("searchTerm", movieName)  
      fetch(tes) 
      .then(resp => resp.json())
      .then(data => {
        if (data.Error) {
          setMovieDetails([])
          // setMovieFound(true)
        }else{
          setMovieDetails(data.results)
          // setMovieFound(false)
        }
      })
    }
    else if(movieName.length == 0){
      displayMovie.current.classList.remove('active')
      localStorage.removeItem('searchTerm')
      setSearchTerm()
      setMovieDetails([])
    }
    
  }
  const movieItem = MovieDetails.map((movie) => {
    const poster = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    return(
      <Link to={`/${movie.id}`} key={movie.id} className='seacrhCard'>
        <div className="poster-contianer">
          <img src={poster} className='poster' alt={movie.title}/>
        </div>
        <div className='title2'>
          <p>{movie.title}</p>
          <span>{movie.release_date}</span>
        </div>
      </Link>
    )
  })
 
  
  return(
    <>
    <div className="navbar bg-base-100">
      <div className="navbar-start flex-1">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3
          z-[1000] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/all'>All Tv and Movie</Link></li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-xl">Corn Movie</Link>
      </div>
      <div className="gap-2 flex">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input
          input-bordered w-36 md:w-auto" onChange={({target})=> fetchMovie(target.value)}/>
        </div>
        <button className="btn btn-square" onClick={clearMovie}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
    <div className='displayMovie' ref={displayMovie}>
       {movieItem}
     </div>
    </>
  )
}

export default MovieList