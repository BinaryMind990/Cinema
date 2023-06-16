import { createContext, useEffect, useState } from 'react';
import { dataClient } from 'apis/CinemaClient/DataClient/DataClient';
import Loader from 'components/UI/Loader/Loader';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [types, setTypes] = useState([]);
	const [halls, setHalls] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMovies();
		getTypes();
		getHalls();
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

	const contextValue = {
		movies,
		setMovies,
		types,
		halls,
		loading,
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<Loader />
			</div>
		);
	}
	return (
		<DataContext.Provider value={contextValue}>
			{children}
		</DataContext.Provider>
	);
};
