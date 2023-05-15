import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Layout/Header';
import Movies from './components/Movies/Movies';
import Projections from './components/Projections/Projections';
import TicketsList from './components/Tickets/TicketsList';
import Movie from './components/Movies/Movie';
import CreateMovie from './components/Movies/CreateMovie';
import EditMovie from './components/Movies/EditMovie';
import CreateProjection from './components/Projections/CreateProjection';
import BuyTicket from './components/Tickets/BuyTicket';

function App() {
	return (
		<Router>
			<Fragment>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/movies' element={<Movies />} />
					<Route path='/movies/:id' element={<Movie />} />
					<Route path='/movies/add' element={<CreateMovie />} />
					<Route path='/movies/edit/:id' element={<EditMovie />} />
					<Route path='/projections' element={<Projections />} />
					<Route path='/projections/add' element={<CreateProjection />} />
					<Route path='/tickets' element={<TicketsList />} />
					<Route
						path='/tickets/buy/projections/:id'
						element={<BuyTicket />}
					/>
				</Routes>
			</Fragment>
		</Router>
	);
}

export default App;
