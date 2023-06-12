import { useNavigate } from 'react-router-dom';
import { movieClient } from 'apis/CinemaClient';
import MovieForm from '../MovieForm/MovieForm';
import { useContext } from 'react';
import { DataContext } from 'contexts/MainContext';

const CreateMovie = () => {
	const navigate = useNavigate();
	const { setMovies } = useContext(DataContext);

	const handleFormSubmit = async (formData) => {
		await movieClient.createMovie(formData);

		setMovies((prevMovies) => [formData, ...prevMovies]);
		navigate('/movies');
	};

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Create movie</h1>
			</div>
			<div className='page-wrapper'>
				<MovieForm onSubmit={handleFormSubmit} />
			</div>
		</div>
	);
};

export default CreateMovie;
