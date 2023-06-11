import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import styles from './Movie.module.css';
import CinemaAxios from '../../../apis/CinemaAxios';

const Movie = () => {
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await CinemaAxios.get(`/movies/${id}`);
				setMovie(res.data);
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
				<CircleLoader size={75} />
			</div>
		);
	}

	if (error) {
		return <p>Oops! Something went wrong. Please try again later.</p>;
	}

	return (
		<div className={styles['movie-container']}>
			<img
				className={styles['movie-image']}
				src={movie.posterLink}
				alt={`Movie poster for ${movie.name}`}
			/>
			<div className={styles['movie-details']}>
				<div className={styles['movie-info']}>
					<h1>{movie.name}</h1>
					<p>Duration: {movie.duration} min</p>
				</div>
				<p>Country: {movie.country}</p>
				<p>Distributor: {movie.distributor}</p>
				<p>Year: {movie.year}</p>
				<div className={styles['movie-description']}></div>
			</div>
		</div>
	);
};
export default Movie;