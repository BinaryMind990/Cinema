import { useEffect, useState } from 'react';
import { withNavigation } from '../../routeconf';
import { CircleLoader } from 'react-spinners';
import CinemaAxios from '../../apis/CinemaAxios';
import Button from '../UI/Button';
import styles from './CreateProjection.module.css';
import { toast } from 'react-toastify';

const CreateProjection = (props) => {
	const [movies, setMovies] = useState([]);
	const [types, setTypes] = useState([]);
	const [halls, setHalls] = useState([]);
	const [projectionData, setProjectionData] = useState({
		movieId: '',
		typeId: '',
		hallId: '',
		dateTimeStr: '',
		ticketPrice: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMovies();
		getTypes();
		getHalls();
	}, []);

	const getMovies = async () => {
		try {
			const res = await CinemaAxios.get(`/movies`);
			setMovies(res.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const getTypes = async () => {
		try {
			const res = await CinemaAxios.get(`/types`);
			setTypes(res.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const getHalls = async () => {
		try {
			const res = await CinemaAxios.get(`/halls`);
			setHalls(res.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const addProjectionSubmitHandle = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.post('/projections', projectionData);
			toast.success('Projection was added successfully!', {
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
					{movies.map((movie) => {
						return (
							<option key={movie.id} value={movie.id}>
								{movie.name}
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
					{types.map((type) => {
						return (
							<option key={type.id} value={type.id}>
								{type.name}
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
					{halls.map((hall) => {
						return (
							<option key={hall.id} value={hall.id}>
								{hall.name}
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
