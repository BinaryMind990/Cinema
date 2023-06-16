import { useNavigate } from 'react-router-dom';
import MovieForm from '../MovieForm/MovieForm';
import { useState } from 'react';
import ErrorModal from 'components/UI/Modals/ErrorModal';
import { movieClient } from 'apis/CinemaClient/MovieClient/MovieClient';

const CreateMovie = () => {
	const [errorModal, setErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleFormSubmit = async (formData) => {
		try {
			await movieClient.createMovie(formData);
			navigate('/movies');
		} catch (error) {
			const errorMessage =
				error.response.data.errors[0]?.defaultMessage ||
				error.response.data.errors[1]?.defaultMessage ||
				'Unknown error occurred';
			setErrorMessage(errorMessage);
			setErrorModal(true);
			return;
		}
	};

	return (
		<div>
			{errorModal && (
				<ErrorModal
					title='Error'
					message={errorMessage}
					onClose={() => setErrorModal(false)}
				/>
			)}
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
