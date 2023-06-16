import { useState } from 'react';
import Button from 'components/UI/Button/Button';

const ProjectionForm = ({ movies, types, halls, onSubmit }) => {
	const [projectionData, setProjectionData] = useState({
		movieId: '',
		typeId: '',
		hallId: '',
		dateTimeStr: '',
		tiketPrice: '',
	});

	const checkType = projectionData.typeId;

	const hallsOption = () => {
		if (!checkType) {
			return [];
		}
		switch (checkType) {
			case '1':
				return [halls[0], halls[1], halls[2]];
			case '2':
				return [halls[0], halls[3]];
			case '3':
				return [halls[3], halls[4]];
			default:
				return [];
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(projectionData);
	};
	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				<label htmlFor='movieName'>Movie</label>
				<select
					required
					name='movieName'
					id='movieName'
					onChange={(e) =>
						setProjectionData({
							...projectionData,
							movieId: e.target.value,
						})
					}
				>
					<option value=''>Choose movie</option>
					{movies.map((movie) => (
						<option key={movie.id} value={movie.id}>
							{movie.name}
						</option>
					))}
				</select>
				<label htmlFor='type'>Type</label>
				<select
					required
					name='type'
					id='type'
					onChange={(e) =>
						setProjectionData({
							...projectionData,
							typeId: e.target.value,
						})
					}
				>
					<option value=''>Choose type</option>
					{types.map((type) => (
						<option key={type.id} value={type.id}>
							{type.name}
						</option>
					))}
				</select>
				{checkType && (
					<>
						<label htmlFor='hall'>Hall</label>
						<select
							required
							name='hall'
							id='hall'
							onChange={(e) =>
								setProjectionData({
									...projectionData,
									hallId: e.target.value,
								})
							}
						>
							<option value=''>Choose hall</option>
							{hallsOption().map((hall) => (
								<option key={hall.id} value={hall.id}>
									{hall.name}
								</option>
							))}
						</select>
					</>
				)}
				<label htmlFor='dateAndTime'>Date and Time</label>
				<input
					required
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
					min={new Date().toISOString().slice(0, 16)}
				/>
				<label htmlFor='ticketPrice'>Ticket Price</label>
				<input
					required
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
	);
};
export default ProjectionForm;
