import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import styles from './Movie.module.css';
import { dataClient } from 'apis/CinemaClient';
import { FaImdb } from 'react-icons/fa';

const Movie = () => {
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await dataClient.getMoviesById(id);
				setMovie(res);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};
		getMovie();
	}, [id]);

	if (loading) {
		return (
			<div className='loader-container'>
				<SyncLoader size={75} />
			</div>
		);
	}

	if (error) {
		return <p>Oops! Something went wrong. Please try again later.</p>;
	}

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Movie details</h1>
			</div>
			<div className='page-wrapper'>
				<div className={styles['movie-container']}>
					<img
						className={styles['movie-image']}
						src={movie.posterLink}
						alt={`Movie poster for ${movie.name}`}
					/>
					<div className={styles['movie-details']}>
						<div className={styles['movie-info']}>
							<h2>{movie.name}</h2>
							<p>Duration: {movie.duration} min</p>
							<p>Country: {movie.country}</p>
							<p>Distributor: {movie.distributor}</p>
							<p>Year: {movie.year}</p>
							<p>Director: {movie.director}</p>
							<Link
								target='blank'
								className={styles['imdb-link']}
								to={movie.imdbLink}
							>
								<FaImdb size={55} className={styles.icon} />
							</Link>
							<p className={styles['movie-description']}>Description:</p>
							<p>{movie.description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Movie;
