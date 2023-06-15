import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from 'contexts/MainContext';
import ProjectionForm from './ProjectionForm/ProjectionForm';
import { formatErrorMessage } from 'utils/ErrorUtils/ErrorUtils';
import ErrorModal from 'components/UI/Modals/ErrorModal';
import { projectionClient } from 'apis/CinemaClient/ProjectionClient/ProjectionClient';

const CreateProjection = () => {
	const { movies, types, halls } = useContext(DataContext);
	const [errorModal, setErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const addProjectionSubmitHandle = async (projectionData) => {
		try {
			await projectionClient.createProjection(projectionData);
			navigate('/projections');
		} catch (error) {
			console.log(error);
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
