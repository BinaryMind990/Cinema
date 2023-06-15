import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieForm from '../MovieForm/MovieForm';
import Loader from 'components/UI/Loader/Loader';
import { formatErrorMessage } from 'utils/ErrorUtils/ErrorUtils';
import ErrorModal from 'components/UI/Modals/ErrorModal';
import { dataClient } from 'apis/CinemaClient/DataClient/DataClient';
import { movieClient } from 'apis/CinemaClient/MovieClient/MovieClient';

const EditMovie = () => {
	const [editMovieData, setEditMovieData] = useState({});
	const [errorModal, setErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
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
			navigate(`/movies/${id}`);
		} catch (error) {
			const errorMessage =
				error.response.data.errors[0]?.defaultMessage ||
				error.response.data.errors[1]?.defaultMessage ||
				'Unknown error occurred';
			const formattedMessage = formatErrorMessage(errorMessage);

			setErrorMessage(formattedMessage);

			setErrorModal(true);
			return;
		}
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
			{errorModal && (
				<ErrorModal
					title='Error'
					message={errorMessage}
					onClose={() => setErrorModal(false)}
				/>
			)}
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
