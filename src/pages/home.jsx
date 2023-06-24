import MovieList from "../component/movie/movieList.jsx"
import Card from "../component/movie/card.jsx"
import Tv from "../component/tv/tv.jsx"
import Trailer from "../component/trailer/trailer.jsx"
import Footer from './footer.jsx'
const Home = () => {
  return(
    <>
    <MovieList />
    <Trailer />
    <Card />
    <Tv />
    <Footer />
    </>
  )
}
export default Home