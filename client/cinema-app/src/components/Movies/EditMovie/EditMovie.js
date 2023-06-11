import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditMovie.module.css';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';
import MovieForm from '../CreateMovie/CreateForm/MovieForm';
import { dataClient, movieClient } from 'apis/CinemaClient';

const EditMovie = () => {
	const [editMovieData, setEditMovieData] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await dataClient.getMoviesById(id);
				setEditMovieData(res);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getMovie();
	}, [id]);

	const handleFormSubmit = async (formData) => {
		try {
			await movieClient.editMovie(id, formData);
			toast.success(`Movie ${formData.name} was updated successfully!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
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
			<MovieForm onSubmit={handleFormSubmit} initialData={editMovieData} />
		</div>
	);
};

export default EditMovie;
