import { useEffect, useState } from 'react';

import CinemaAxios from '../../apis/CinemaAxios';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import styles from './Movies.module.css';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getMovies();
	}, []);

	const getMovies = async () => {
		try {
			const res = await CinemaAxios.get(`/movies`);
			setMovies(res.data);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	const getMovieUrl = (movieId) => {
		const url = `/movies/${movieId}`;
		console.log('getMovieUrl', url);
		return url;
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	if (error) {
		return <p>Oops! Something went wrong. Please try again later</p>;
	}

	return (
		<div>
			<h1>Movies</h1>
			<table>
				<thead>
					<tr>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie.id}>
							<td>
								<Link
									className={styles.link}
									to={getMovieUrl(movie.id)}
								>
									{movie.name}
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default Movies;
