import { useContext, useEffect, useState } from 'react';

import CinemaAxios from '../../apis/CinemaAxios';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import styles from './Movies.module.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';

const Movies = () => {
	const { role } = useContext(UserContext);

	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

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
		return `/movies/${movieId}`;
	};

	const goToAddHandler = () => {
		navigate('/movies/add');
	};

	const goToEditHandler = (movieId) => {
		navigate(`/movies/edit/${movieId}`);
	};

	const deleteHandler = async (movieId) => {
		try {
			await CinemaAxios.delete(`/movies/${movieId}`);
			setMovies(movies.filter((movie) => movie.id !== movieId));
			toast.success('Movie was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to delete the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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
							<td className={styles.cell}>
								<div className={styles.moviePoster}>
									<img
										src={movie.posterLink}
										alt={`Movie poster for ${movie.name}`}
									/>
								</div>
								<Link
									className={styles.link}
									to={getMovieUrl(movie.id)}
								>
									{movie.name}
								</Link>

								{role === 'ROLE_ADMIN' && (
									<div className={styles.actions}>
										<div className={styles.buttonWrapper}>
											<Button
												className='orange'
												onClick={() => goToEditHandler(movie.id)}
											>
												Edit
											</Button>
										</div>
										<div className={styles.buttonWrapper}>
											<Button
												className='red'
												onClick={() => deleteHandler(movie.id)}
											>
												<FaTrash className={styles.trashIcon} />
											</Button>
										</div>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{role === 'ROLE_ADMIN' && (
				<div className={styles.addButton}>
					<Button className='blue' onClick={goToAddHandler}>
						Add
					</Button>
				</div>
			)}
		</div>
	);
};
export default Movies;
