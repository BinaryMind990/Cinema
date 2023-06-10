import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import CinemaAxios from '../../../apis/CinemaAxios';
import Button from '../../UI/Button';
import styles from './CreateProjection.module.css';
import { toast } from 'react-toastify';
import { DataContext } from 'contexts/GetDataContext';

const CreateProjection = () => {
	const { movies } = useContext(DataContext);
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
	const navigate = useNavigate();

	useEffect(() => {
		getTypes();
		getHalls();
	}, []);

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
			navigate('/projections');
		} catch (error) {
			toast.error('Failed to add projection. Please try again!', {
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
		<div>
			<div className='title-wrapper'>
				<h1>Create Projection</h1>
			</div>
			<div className='page-wrapper'>
				<form
					className={styles['create-projection-form']}
					onSubmit={addProjectionSubmitHandle}
				>
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
						Save Projection
					</Button>
				</form>
			</div>
		</div>
	);
};
export default CreateProjection;
