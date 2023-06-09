import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import HomePage from 'components/HomePage';
import Movies from 'components/Movies/Movies';
import Movie from 'components/Movies/Movie/Movie';
import CreateMovie from '../components/Movies/CreateMovie/CreateMovie';
import EditMovie from 'components/Movies/EditMovie/EditMovie';
import Projections from '../components/Repertoire/Projections/Projections';
import CreateProjection from 'components/Repertoire/CreateProjection/CreateProjection';
import Users from 'components/Users/Users';
import User from '../components/Users/User/User';
import RegisterUser from '../components/Users/RegisterUser/RegisterUser';
import EditUser from 'components/Users/EditUser/EditUser';
import Report from 'components/Report/Report';
import TicketsList from 'components/Tickets/TicketList/TicketsList';
import BuyTicket from 'components/Tickets/BuyTicket/BuyTicket';
import { UserContext } from 'contexts/UserContext';
import NotFound from 'components/NotFound';

export const AppRoutes = () => {
	const { role } = useContext(UserContext);
	return (
		<Routes>
			<Route path='/movies/:id' element={<Movie />} />
			<Route path='/projections' element={<Projections />} />
			<Route path='/tickets/buy/projections/:id' element={<BuyTicket />} />
			<Route path='/account/registration' element={<RegisterUser />} />
			<Route path='/notfound' element={<NotFound />} />
			{!role && <Route path='/' element={<HomePage />} />}
			{role && (
				<>
					<Route path='/account/:id' element={<User />} />
					<Route path='/account/edit/:id' element={<EditUser />} />
				</>
			)}
			{role === 'ROLE_ADMIN' ? (
				<>
					<Route path='/movies' element={<Movies />} />
					<Route path='/movies/add' element={<CreateMovie />} />
					<Route path='/movies/edit/:id' element={<EditMovie />} />
					<Route path='/users' element={<Users />} />
					<Route path='/projections/add' element={<CreateProjection />} />
					<Route
						path='/tickets/projection/:id'
						element={<TicketsList />}
					/>
					<Route path='/reports' element={<Report />} />
				</>
			) : (
				<>
					<Route
						path='/'
						element={<Navigate to='/projection' replace />}
					/>
					<Route path='/movies' element={<Navigate to='/' replace />} />
					<Route
						path='/movies/add'
						element={<Navigate to='/' replace />}
					/>
					<Route
						path='/movies/edit/:id'
						element={<Navigate to='/' replace />}
					/>
					<Route path='/users' element={<Navigate to='/' replace />} />
					<Route
						path='/projections/add'
						element={<Navigate to='/' replace />}
					/>
					<Route
						path='/tickets/projection/:id'
						element={<Navigate to='/' replace />}
					/>
					<Route path='/reports' element={<Navigate to='/' replace />} />
				</>
			)}
			<Route path='*' element={<Navigate to='/notfound' replace />} />
		</Routes>
	);
};
