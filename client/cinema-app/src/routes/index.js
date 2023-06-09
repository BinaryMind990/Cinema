import HomePage from 'components/HomePage';
import Movies from 'components/Movies/Movies';
import Projections from '../components/Repertoire/Projections/Projections';
import TicketsList from 'components/Tickets/TicketsList';
import Movie from 'components/Movies/Movie/Movie';
import CreateMovie from '../components/Movies/CreateMovie/CreateMovie';
import EditMovie from 'components/Movies/EditMovie/EditMovie';
import CreateProjection from 'components/Repertoire/CreateProjection/CreateProjection';
import BuyTicket from 'components/Tickets/BuyTicket';
import Users from 'components/Users/Users';
import User from '../components/Users/User/User';
import EditUser from 'components/Users/EditUser/EditUser';
import RegisterUser from '../components/Users/RegisterUser/RegisterUser';
import Login from 'components/Authorization/Login';
import Report from 'components/Report/Report';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from 'contexts/UserContext';

export const AppRoutes = () => {
	const { role } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		const protectedPaths = ['/users', '/reports'];

		if (
			!role &&
			protectedPaths.some((path) =>
				window.location.pathname.startsWith(path)
			)
		) {
			navigate('/', { replace: true });
		}

		if (
			role !== 'ROLE_ADMIN' &&
			window.location.pathname.startsWith('/users')
		) {
			navigate('/movies', { replace: true });
		}
	}, [role, navigate]);
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<Login />} />
			<Route path='/movies' element={<Movies />} />
			<Route path='/movies/:id' element={<Movie />} />
			<Route path='/movies/add' element={<CreateMovie />} />
			<Route path='/movies/edit/:id' element={<EditMovie />} />
			<Route path='/projections' element={<Projections />} />
			<Route path='/projections/add' element={<CreateProjection />} />
			<Route path='/tickets/projection/:id' element={<TicketsList />} />
			<Route path='/tickets/buy/projections/:id' element={<BuyTicket />} />
			<Route path='/users' element={<Users />} />
			<Route path='/account/:id' element={<User />} />
			<Route path='/account/registration' element={<RegisterUser />} />
			<Route path='/account/edit/:id' element={<EditUser />} />
			<Route path='/reports' element={<Report />} />
		</Routes>
	);
};
