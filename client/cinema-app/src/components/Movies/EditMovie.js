import { useEffect, useState } from 'react';
import { withNavigation } from '../../routeconf';
import Button from '../UI/Button';
import { useParams } from 'react-router-dom';
import styles from './EditMovie.module.css';
import CinemaAxios from '../../apis/CinemaAxios';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';

const EditMovie = (props) => {
	const [editMovieData, setEditMovieData] = useState({
		name: '',
		duration: '',
		distributor: '',
		country: '',
		year: '',
		description: '',
	});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await CinemaAxios.get(`/movies/${id}`);
				setEditMovieData(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getMovie();
	}, [id]);

	const editMovieHandleSubmit = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.put(`/movies/${id}`, editMovieData);
			toast.success(`Movie ${editMovieData.name} was edited successfully!`, {
				position: toast.POSITION.TOP_RIGHT,
			});

			props.navigate('/movies');
		} catch (error) {
			toast.error('Error occured please try again!', {
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

	return (
		<div className={styles['create-movie-container']}>
			<h1 className={styles['create-movie-title']}>Create movie</h1>
			<form
				className={styles['create-movie-form']}
				onSubmit={editMovieHandleSubmit}
			>
				<label htmlFor='movieName'>Title</label>
				<input
					type='text'
					name='movieName'
					id='movieName'
					className={styles['create-movie-input']}
					value={editMovieData.name}
					onChange={(e) =>
						setEditMovieData({ ...editMovieData, name: e.target.value })
					}
				/>
				<br />
				<label htmlFor='duration'>Duration</label>
				<input
					type='number'
					name='duration'
					id='duration'
					className={styles['create-movie-input']}
					value={editMovieData.duration}
					onChange={(e) =>
						setEditMovieData({
							...editMovieData,
							duration: e.target.value,
						})
					}
				/>
				<br />
				<label htmlFor='distributor'>Distributor</label>
				<input
					type='text'
					name='distributor'
					id='distributor'
					className={styles['create-movie-input']}
					value={editMovieData.distributor}
					onChange={(e) =>
						setEditMovieData({
							...editMovieData,
							distributor: e.target.value,
						})
					}
				/>
				<br />
				<label htmlFor='country'>Country</label>
				<input
					type='text'
					name='country'
					id='country'
					className={styles['create-movie-input']}
					value={editMovieData.country}
					onChange={(e) =>
						setEditMovieData({
							...editMovieData,
							country: e.target.value,
						})
					}
				/>
				<br />
				<label htmlFor='year'>Year</label>
				<input
					type='number'
					name='year'
					id='year'
					className={styles['create-movie-input']}
					value={editMovieData.year}
					onChange={(e) =>
						setEditMovieData({ ...editMovieData, year: e.target.value })
					}
				/>
				<br />
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					id='description'
					className={styles['create-movie-textarea']}
					value={editMovieData.description}
					onChange={(e) =>
						setEditMovieData({
							...editMovieData,
							description: e.target.value,
						})
					}
				/>
				<br />
				<Button type='submit' className='orange'>
					Edit
				</Button>
			</form>
		</div>
	);
};
export default withNavigation(EditMovie);
