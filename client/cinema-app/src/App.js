import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Layout/Header';
import Movies from './components/Movies/Movies';
import Projections from './components/Projections/Projections';
import Tikets from './components/Tikets/Tikets';
import Movie from './components/Movies/Movie';

function App() {
	return (
		<Router>
			<Fragment>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/movies' element={<Movies />} />
					<Route path='/movies/:id' element={<Movie />} />
					<Route path='/projections' element={<Projections />} />
					<Route path='/tikets' element={<Tikets />} />
				</Routes>
			</Fragment>
		</Router>
	);
}

export default App;
