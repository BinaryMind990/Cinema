import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { useParams } from 'react-router-dom';
import styles from './EditMovie.module.css';
import CinemaAxios from '../../apis/CinemaAxios';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';

const EditMovie = () => {
	const [editMovieData, setEditMovieData] = useState({
		name: '',
		duration: '',
		distributor: '',
		country: '',
		year: '',
		description: '',
		posterLink: '',
	});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

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
			toast.success(
				`Movie ${editMovieData.name} was updated successfully!`,
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			);

			navigate('/movies');
		} catch (error) {
			toast.error('Failed to update the movie. Please try again!', {
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
		<div className={styles['edit-movie-container']}>
			<h1 className={styles['edit-movie-title']}>Edit movie</h1>
			<form
				className={styles['edit-movie-form']}
				onSubmit={editMovieHandleSubmit}
			>
				<label htmlFor='poster'>Poster</label>
				<input
					type='text'
					name='poster'
					id='poster'
					className={styles['edit-movie-input']}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							posterLink: e.target.value,
						}))
					}
				/>
				<label htmlFor='movieName'>Title</label>
				<input
					type='text'
					name='movieName'
					id='movieName'
					className={styles['edit-movie-input']}
					value={editMovieData.name}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							name: e.target.value,
						}))
					}
				/>
				<br />
				<label htmlFor='duration'>Duration</label>
				<input
					type='number'
					name='duration'
					id='duration'
					className={styles['edit-movie-input']}
					value={editMovieData.duration}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							duration: e.target.value,
						}))
					}
				/>
				<br />
				<label htmlFor='distributor'>Distributor</label>
				<input
					type='text'
					name='distributor'
					id='distributor'
					className={styles['edit-movie-input']}
					value={editMovieData.distributor}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							distributor: e.target.value,
						}))
					}
				/>
				<br />
				<label htmlFor='country'>Country</label>
				<input
					type='text'
					name='country'
					id='country'
					className={styles['edit-movie-input']}
					value={editMovieData.country}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							country: e.target.value,
						}))
					}
				/>
				<br />
				<label htmlFor='year'>Year</label>
				<input
					type='number'
					name='year'
					id='year'
					className={styles['edit-movie-input']}
					value={editMovieData.year}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							year: e.target.value,
						}))
					}
				/>
				<br />
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					id='description'
					className={styles['edit-movie-textarea']}
					value={editMovieData.description}
					onChange={(e) =>
						setEditMovieData((prevData) => ({
							...prevData,
							description: e.target.value,
						}))
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
export default EditMovie;
