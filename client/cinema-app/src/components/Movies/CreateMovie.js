import { useState } from 'react';
import Button from '../UI/Button';
import CinemaAxios from '../../apis/CinemaAxios';
import { withNavigation } from '../../routeconf';
import styles from './CreateMovie.module.css';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const CreateMovie = (props) => {
	const [movieData, setMovieData] = useState({
		name: '',
		duration: '',
		distributor: '',
		country: '',
		year: '',
		description: '',
	});
	const [loading, setLoading] = useState(true);

	const addMovieHandleSubmit = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.post('/movies/', movieData);
			toast.success('Movie was added successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoading(false);
			props.navigate('/movies');
		} catch (error) {
			toast.error('Error occured please try again!', {
				position: toast.POSITION.TOP_CENTER,
			});
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	return (
		<div className={styles['create-movie-container']}>
			<h1 className={styles['create-movie-title']}>Create movie</h1>
			<form
				className={styles['create-movie-form']}
				onSubmit={addMovieHandleSubmit}
			>
				<label htmlFor='movieName'>Title</label>
				<input
					type='text'
					name='movieName'
					id='movieName'
					className={styles['create-movie-input']}
					value={movieData.name}
					onChange={(e) =>
						setMovieData({ ...movieData, name: e.target.value })
					}
				/>
				<br />
				<label htmlFor='duration'>Duration</label>
				<input
					type='number'
					name='duration'
					id='duration'
					className={styles['create-movie-input']}
					value={movieData.duration}
					onChange={(e) =>
						setMovieData({ ...movieData, duration: e.target.value })
					}
				/>
				<br />
				<label htmlFor='distributor'>Distributor</label>
				<input
					type='text'
					name='distributor'
					id='distributor'
					className={styles['create-movie-input']}
					value={movieData.distributor}
					onChange={(e) =>
						setMovieData({ ...movieData, distributor: e.target.value })
					}
				/>
				<br />
				<label htmlFor='country'>Country</label>
				<input
					type='text'
					name='country'
					id='country'
					className={styles['create-movie-input']}
					value={movieData.country}
					onChange={(e) =>
						setMovieData({ ...movieData, country: e.target.value })
					}
				/>
				<br />
				<label htmlFor='year'>Year</label>
				<input
					type='number'
					name='year'
					id='year'
					className={styles['create-movie-input']}
					value={movieData.year}
					onChange={(e) =>
						setMovieData({ ...movieData, year: e.target.value })
					}
				/>
				<br />
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					id='description'
					className={styles['create-movie-textarea']}
					value={movieData.description}
					onChange={(e) =>
						setMovieData({ ...movieData, description: e.target.value })
					}
				/>
				<br />
				<Button type='submit' className={styles['create-movie-submit']}>
					Add
				</Button>
			</form>
		</div>
	);
};
export default withNavigation(CreateMovie);
