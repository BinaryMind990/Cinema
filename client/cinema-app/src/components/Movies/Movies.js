import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';
import { dataClient } from 'apis/CinemaClient/DataClient/DataClient';
import { movieClient } from 'apis/CinemaClient/MovieClient/MovieClient';
import { NavigateContext } from 'contexts/NavigateContext';
import ConfirmationModal from 'components/UI/Modals/ConfirmationModal';
import Button from '../UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import { Pagination } from 'antd';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);
	const { getMovieUrl, goToAddHandler, goToEditHandler } =
		useContext(NavigateContext);

	useEffect(() => {
		getMovies(pageNo - 1);
	}, [pageNo]);

	const getMovies = async (newPageNo) => {
		try {
			const conf = {
				params: {
					pageNo: newPageNo,
				},
			};

			const response = await dataClient.getMoviesPage(conf);
			setMovies(response.data);
			setTotalPages(response.headers['total-pages'] + 0);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const deleteMovie = async (movieId) => {
		await movieClient.deleteMovie(movieId);
		setMovies(movies.filter((movie) => movie.id !== movieId));
	};

	const handlePageChange = (newPageNo) => {
		setPageNo(newPageNo);
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
					<Pagination
						defaultCurrent={pageNo}
						total={totalPages}
						onChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
};
export default Movies;
