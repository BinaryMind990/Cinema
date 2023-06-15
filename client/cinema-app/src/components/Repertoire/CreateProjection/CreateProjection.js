import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from 'contexts/MainContext';
import ProjectionForm from './ProjectionForm/ProjectionForm';
import { projectionClient } from 'apis/CinemaClient/ProjectionClient/ProjectionClient';

const CreateProjection = () => {
	const { movies, types, halls } = useContext(DataContext);

	const navigate = useNavigate();

	const addProjectionSubmitHandle = async (projectionData) => {
		await projectionClient.createProjection(projectionData);
		navigate('/projections');
	};

	return (
		<div>
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
