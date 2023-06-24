import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import MovieDetailsPage from './component/movieDetails/movieDetailsPage.jsx';
import TvDetails from './component/movieDetails/tvdetails.jsx';
import Tranding from './component/tranding/tranding.jsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<App />}/>
      <Route path='/:imdbId' element={<MovieDetailsPage />}/>
      <Route path='/tv/:imdbId' element={<TvDetails />}/>
      <Route path='/all' element={<Tranding />}/>
    </Routes>
  </BrowserRouter>
  </SkeletonTheme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
