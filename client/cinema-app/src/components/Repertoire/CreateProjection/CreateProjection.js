import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from 'contexts/MainContext';
import { projectionClient } from 'apis/CinemaClient';
import Loader from 'components/UI/Loader/Loader';
import ProjectionForm from './ProjectionForm/ProjectionForm';

const CreateProjection = () => {
	const { movies, types, halls } = useContext(DataContext);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const addProjectionSubmitHandle = async (projectionData) => {
		await projectionClient.createProjection(projectionData);
		setLoading(false);
		navigate('/projections');
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
			<div className='title-wrapper'>
				<h1>Create Projection</h1>
			</div>
			<div className='page-wrapper'>
				<ProjectionForm
					movies={movies}
					types={types}
					halls={halls}
					onSubmit={addProjectionSubmitHandle}
				/>
			</div>
		</div>
	);
};
export default CreateProjection;
