import { useEffect, useState } from 'react';

import CinemaAxios from '../../apis/CinemaAxios';
import Button from '../UI/Button';
import { withNavigation } from '../../routeconf';
import { CircleLoader } from 'react-spinners';
import styles from './Movies.module.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Movies = (props) => {
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
		return url;
	};
	const goToAddHandler = () => {
		props.navigate('/movies/add');
	};

	const goToEditHandler = (movieId) => {
		props.navigate(`/movies/edit/${movieId}`);
	};

	const deleteHandler = async (movieId) => {
		try {
			await CinemaAxios.delete(`/movies/${movieId}`);
			setMovies(movies.filter((movie) => movie.id !== movieId));
			toast.success('Movie was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Error occured please try again!', {
				position: toast.POSITION.TOP_CENTER,
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
						<th>{props.title}</th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie.id}>
							<td className={styles.cell}>
								<Link
									className={styles.link}
									to={getMovieUrl(movie.id)}
								>
									{movie.name}
								</Link>
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
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.addButton}>
				<Button className='blue' onClick={goToAddHandler}>
					Add
				</Button>
			</div>
		</div>
	);
};
export default withNavigation(Movies);
