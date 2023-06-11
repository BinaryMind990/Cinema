import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import MovieForm from '../MovieForm/MovieForm';
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
		await movieClient.editMovie(id, formData);
		navigate(`/movies/${id}`);
	};

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
				<h1>Edit movie</h1>
			</div>
			<div className='page-wrapper'>
				<MovieForm
					onSubmit={handleFormSubmit}
					initialData={editMovieData}
				/>
			</div>
		</div>
	);
};

export default EditMovie;
