import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { DataContext } from 'contexts/MainContext';
import { projectionClient } from 'apis/CinemaClient';
import Loader from 'components/UI/Loader/Loader';

const CreateProjection = () => {
	const { movies, types, halls, loading } = useContext(DataContext);
	const [projectionData, setProjectionData] = useState({
		movieId: '',
		typeId: '',
		hallId: '',
		dateTimeStr: '',
		ticketPrice: '',
	});

	const navigate = useNavigate();

	const addProjectionSubmitHandle = async (e) => {
		e.preventDefault();
		await projectionClient.createProjection(projectionData);
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
				<form className={'form'} onSubmit={addProjectionSubmitHandle}>
					<label htmlFor='movieName'>Movie</label>
					<select
						name='movieName'
						id='movieName'
						onChange={(e) =>
							setProjectionData({
								...projectionData,
								movieId: e.target.value,
							})
						}
					>
						<option>Choose movie</option>
						{movies.map((movie) => {
							return (
								<option key={movie.id} value={movie.id}>
									{movie.name}
								</option>
							);
						})}
					</select>
					<label htmlFor='Type'>Type</label>
					<select
						name='Type'
						id='Type'
						onChange={(e) =>
							setProjectionData({
								...projectionData,
								typeId: e.target.value,
							})
						}
					>
						<option>Chose type</option>
						{types.map((type) => {
							return (
								<option key={type.id} value={type.id}>
									{type.name}
								</option>
							);
						})}
					</select>
					<label htmlFor='hall'>Hall</label>
					<select
						name='hall'
						id='hall'
						onChange={(e) =>
							setProjectionData({
								...projectionData,
								hallId: e.target.value,
							})
						}
					>
						<option>Chose hall</option>
						{halls.map((hall) => {
							return (
								<option key={hall.id} value={hall.id}>
									{hall.name}
								</option>
							);
						})}
					</select>
					<label htmlFor='dateAndTime'>Date and Time</label>
					<input
						type='datetime-local'
						name='dateAndTime'
						id='dateAndTime'
						onChange={(e) =>
							setProjectionData({
								...projectionData,
								dateTimeStr: `${e.target.value.slice(
									0,
									10
								)} ${e.target.value.slice(11, 16)}`,
							})
						}
					/>
					<label htmlFor='ticketPrice'>Ticket Price</label>
					<input
						type='number'
						min={0}
						name='ticketPrice'
						id='ticketPrice'
						onChange={(e) =>
							setProjectionData({
								...projectionData,
								ticketPrice: e.target.value,
							})
						}
					/>
					<Button type='submit' className='blue full-width'>
						Save projection
					</Button>
				</form>
			</div>
		</div>
	);
};
export default CreateProjection;
