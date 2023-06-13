import Button from 'components/UI/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectionForm = ({ movies, types, halls, onSubmit }) => {
	const [projectionData, setProjectionData] = useState({
		movieId: '',
		typeId: '',
		hallId: '',
		dateTimeStr: '',
		tiketPrice: '',
	});

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(projectionData);
		navigate('/projections');
	};
	return (
		<form className='form' onSubmit={handleSubmit}>
			<label htmlFor='movieName'>Movie</label>
			<select
				name='movieName'
				id='movieName'
				onChange={(e) =>
					setProjectionData({ ...projectionData, movieId: e.target.value })
				}
			>
				<option>Choose movie</option>
				{movies.map((movie) => (
					<option key={movie.id} value={movie.id}>
						{movie.name}
					</option>
				))}
			</select>
			<label htmlFor='type'>Type</label>
			<select
				name='type'
				id='type'
				onChange={(e) =>
					setProjectionData({ ...projectionData, typeId: e.target.value })
				}
			>
				<option>Choose type</option>
				{types.map((type) => (
					<option key={type.id} value={type.id}>
						{type.name}
					</option>
				))}
			</select>
			<label htmlFor='hall'>Hall</label>
			<select
				name='hall'
				id='hall'
				onChange={(e) =>
					setProjectionData({ ...projectionData, hallId: e.target.value })
				}
			>
				<option>Choose hall</option>
				{halls.map((hall) => (
					<option key={hall.id} value={hall.id}>
						{hall.name}
					</option>
				))}
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
	);
};
export default ProjectionForm;
