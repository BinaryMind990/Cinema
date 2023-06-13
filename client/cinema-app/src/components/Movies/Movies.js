import { useContext, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './Movies.module.css';
import { Link } from 'react-router-dom';
import { NavigateContext } from 'contexts/NavigateContext';
import { dataClient, movieClient } from 'apis/CinemaClient';
import ConfirmationModal from 'components/UI/ConfirmationModal/ConfirmationModal';
import Loader from 'components/UI/Loader/Loader';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const { getMovieUrl, goToAddHandler, goToEditHandler } =
		useContext(NavigateContext);

	useEffect(() => {
		const getMovies = async () => {
			try {
				const res = await dataClient.getMovies();
				setMovies(res);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getMovies();
	}, []);

	const deleteMovie = async (movieId) => {
		await movieClient.deleteMovie(movieId);
		setMovies(movies.filter((movie) => movie.id !== movieId));
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Movies</h1>
			</div>
			<div className='page-wrapper'>
				<div className={styles['add-button']}>
					<Button className='blue' onClick={goToAddHandler}>
						Add movie
					</Button>
				</div>
				<div className='table-wrapper'>
					<table>
						<tbody>
							{movies.map((movie) => (
								<tr key={movie.id}>
									<td className={styles.cell}>
										<div className={styles.moviePoster}>
											<img
												src={movie.posterLink}
												alt={`Movie poster for ${movie.name}`}
											/>
										</div>
										<h2>
											<Link
												className={styles.link}
												to={getMovieUrl(movie.id)}
											>
												{movie.name}
											</Link>
										</h2>
										<div className={styles.actions}>
											<div className={styles['button-wrapper']}>
												<Button
													className='orange'
													onClick={() => goToEditHandler(movie.id)}
												>
													Edit
												</Button>
											</div>
											<div className={styles['button-wrapper']}>
												<ConfirmationModal
													title='Delete movie'
													message={`Are you sure you want to delete the movie ${movie.name}?`}
													onConfirm={() => deleteMovie(movie.id)}
													onCancel={() => {}}
												/>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
export default Movies;
