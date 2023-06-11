import { dataClient, movieClient, userClient } from 'apis/CinemaClient';
import { createContext, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [types, setTypes] = useState([]);
	const [halls, setHalls] = useState([]);
	const [users, setUsers] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMovies();
		getTypes();
		getHalls();
		getUsers();
	}, []);

	const getMovies = async () => {
		try {
			const res = await dataClient.getMovies();
			setMovies(res);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const deleteMovie = async (movieId) => {
		try {
			await movieClient.deleteMovie(movieId);
			setMovies(movies.filter((movie) => movie.id !== movieId));
		} catch (error) {
			toast.error('Failed to delete the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const getTypes = async () => {
		try {
			const res = await dataClient.getTypes();
			setTypes(res);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const getHalls = async () => {
		try {
			const res = await dataClient.getHalls();
			setHalls(res);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const getUsers = async () => {
		try {
			const res = await userClient.get('/users');
			setUsers(res);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const deleteUser = async (userId) => {
		await userClient.delete(userId);
		setUsers(users.filter((user) => user.id !== userId));
	};

	const contextValue = {
		movies,
		setMovies,
		types,
		halls,
		users,
		deleteMovie,
		deleteUser,
		loading,
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}
	return (
		<DataContext.Provider value={contextValue}>
			{children}
		</DataContext.Provider>
	);
};
