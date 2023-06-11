import { useContext } from 'react';
import Button from '../UI/Button';
import { CircleLoader } from 'react-spinners';
import styles from './Movies.module.css';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import { NavigateContext } from 'contexts/NavigateContext';
import { DataContext } from 'contexts/MainContext';

const Movies = () => {
	const { loading } = useContext(UserContext);
	const { movies, deleteMovie } = useContext(DataContext);
	const { getMovieUrl, goToAddHandler, goToEditHandler } =
		useContext(NavigateContext);

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Movies</h1>
			</div>
			<div className='page-wrapper'>
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
											<Button
												className='red'
												onClick={() => deleteMovie(movie.id)}
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
				<div className={styles['add-button']}>
					<Button className='blue' onClick={goToAddHandler}>
						Add movie
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Movies;
