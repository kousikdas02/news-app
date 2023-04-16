import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NewsListing from './pages/NewsListing/NewsListing';
import NewsTrending from './pages/NewsTrending/NewsTrending';
import SearchPage from './pages/SearchPage/SearchPage';
import NewsNav from './component/NewsNav';

function App() {
  return (
    <>
      <NewsNav/>
      <Router>
        <Routes>
          <Route path='/' element={<NewsListing/>}/>
          <Route path='/trending' element={<NewsTrending/>}/>
          <Route path='/search' element={<SearchPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
