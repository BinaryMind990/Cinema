import { dataClient } from 'apis/CinemaClient';
import { createContext, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	const getMovies = async () => {
		try {
			const res = await dataClient.getMovies();
			setMovies(res);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	const deleteMovie = async (movieId) => {
		try {
			await dataClient.deleteMovie(movieId);
			setMovies(movies.filter((movie) => movie.id !== movieId));
		} catch (error) {
			toast.error('Failed to delete the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const contextValue = {
		movies,
		deleteMovie,
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
