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
import Users from './components/Users/Users';
import User from './components/Users/User';
import EditUser from './components/Users/EditUser';
import RegisterUser from './components/Users/RegisterUser';

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
					<Route path='/users' element={<Users />} />
					<Route path='/users/:id' element={<User />} />
					<Route path='/users/registration' element={<RegisterUser />} />
					<Route path='/users/edit/:id' element={<EditUser />} />
				</Routes>
			</Fragment>
		</Router>
	);
}

export default App;
