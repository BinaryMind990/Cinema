import { useEffect, useState } from 'react';
import { withNavigation } from '../../routeconf';
import { CircleLoader } from 'react-spinners';
import CinemaAxios from '../../apis/CinemaAxios';
import Button from '../UI/Button';
import styles from './CreateProjection.module.css';
import { toast } from 'react-toastify';

const CreateProjection = (props) => {
	const [projections, setProjections] = useState([]);
	const [projectionData, setProjectionData] = useState({
		movieId: '',
		typeId: '',
		hallId: '',
		dateTimeStr: '',
		ticketPrice: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProjections();
	}, []);

	const getProjections = async () => {
		try {
			const res = await CinemaAxios.get('/projections');
			setProjections(res.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const addProjectionSubmitHandle = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.post('/projections', projectionData);
			toast.success('Movie was added successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			props.navigate('/projections');
		} catch (error) {
			toast.error('Error occured please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	return (
		<div className={styles['create-projection-container']}>
			<form
				className={styles['create-projection-form']}
				onSubmit={addProjectionSubmitHandle}
			>
				<label htmlFor='movieName'>Movie</label>
				<br />
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
					{projections.map((projection) => {
						return (
							<option
								key={projection.movieId}
								value={projection.movieId}
							>
								{projection.movieName}
							</option>
						);
					})}
				</select>
				<br />
				<label htmlFor='Type'>Type</label>
				<br />
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
					{projections.map((projection) => {
						return (
							<option key={projection.typeId} value={projection.typeId}>
								{projection.typeName}
							</option>
						);
					})}
				</select>
				<br />
				<label htmlFor='hall'>Hall</label>
				<br />
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
					{projections.map((projection) => {
						return (
							<option key={projection.hallId} value={projection.hallId}>
								{projection.hall}
							</option>
						);
					})}
				</select>
				<br />
				<label htmlFor='dateAndTime'>Date and Time</label>
				<br />
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
				<br />
				<label htmlFor='ticketPrice'>Ticket Price</label>
				<br />
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
				<br />
				<Button type='submit' className='blue'>
					Add
				</Button>
			</form>
		</div>
	);
};
export default withNavigation(CreateProjection);
