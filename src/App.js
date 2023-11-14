import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
function App() {

  return(
    <div>
      <Routes>
        <Route path='/' element={<MovieList/>}/>
        <Route path='/home' element={<MovieList/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
      </Routes>
    </div>
  )

}

export default App;
