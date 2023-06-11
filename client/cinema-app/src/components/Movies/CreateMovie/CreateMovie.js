import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { movieClient } from 'apis/CinemaClient';
import MovieForm from './CreateForm/MovieForm';

const CreateMovie = () => {
	const navigate = useNavigate();

	const handleFormSubmit = async (formData) => {
		try {
			await movieClient.createMovie(formData);
			toast.success('Movie was added successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			navigate('/movies');
		} catch (error) {
			toast.error('Failed to add the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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
