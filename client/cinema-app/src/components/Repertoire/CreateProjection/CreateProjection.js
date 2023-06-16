import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from 'contexts/MainContext';
import ProjectionForm from './ProjectionForm/ProjectionForm';
import { projectionClient } from 'apis/CinemaClient/ProjectionClient/ProjectionClient';
import ErrorModal from 'components/UI/Modals/ErrorModal';

const CreateProjection = () => {
	const { movies, types, halls } = useContext(DataContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [errorModal, setErrorModal] = useState(false);
	const navigate = useNavigate();

	const addProjectionSubmitHandle = async (projectionData) => {
		try {
			await projectionClient.createProjection(projectionData);
			navigate('/projections');
		} catch (error) {
			setErrorMessage(error.response.data);
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
				<h1>Create Projection</h1>
			</div>
			<div className='page-wrapper'>
				{halls && (
					<ProjectionForm
						movies={movies}
						types={types}
						halls={halls}
						onSubmit={addProjectionSubmitHandle}
					/>
				)}
			</div>
		</div>
	);
};
export default CreateProjection;
