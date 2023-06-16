import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavigateContext = createContext();

export const NavigateProvider = ({ children }) => {
	const navigate = useNavigate();

	const toRegisterPage = () => {
		navigate('/account/registration');
	};

	const editUser = (userId) => {
		navigate(`/account/edit/${userId}`);
	};

	const getUserUrl = (userId) => {
		return `/account/${userId}`;
	};

	const getMovieUrl = (movieId) => {
		return `/movies/${movieId}`;
	};

	const goToAddHandler = () => {
		navigate('/movies/add');
	};

	const goToEditHandler = (movieId) => {
		navigate(`/movies/edit/${movieId}`);
	};

	const projectionAddHandler = () => {
		navigate('/projections/add');
	};

	const ticketLists = (projectionId) => {
		return navigate(`/tickets/projection/${projectionId}`);
	};

	const contextValue = {
		editUser,
		toRegisterPage,
		getMovieUrl,
		goToEditHandler,
		goToAddHandler,
		projectionAddHandler,
		ticketLists,
		getUserUrl,
	};
	return (
		<NavigateContext.Provider value={contextValue}>
			{children}
		</NavigateContext.Provider>
	);
};
