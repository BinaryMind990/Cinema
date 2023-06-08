import { useContext, useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import Table from '../UI/Table';
import Button from '../UI/Button';
import styles from './Projections.module.css';
import { CircleLoader } from 'react-spinners';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';

const Projections = () => {
	const { user, role } = useContext(UserContext);
	const [projections, setProjections] = useState([]);
	const [searchQuery] = useState({ date: '' });
	const [selectedDate, setSelectedDate] = useState('');
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const getProjections = async () => {
			try {
				let res;
				if (searchQuery.date) {
					res = await CinemaAxios.get('/projections', {
						params: {
							date: searchQuery.date,
						},
					});
				} else {
					res = await CinemaAxios.get('/projections');
				}

				const today = new Date();

				const sortedProjections = res.data
					.filter(
						(projection) => new Date(projection.dateTimeStr) >= today
					)
					.sort((projection1, projection2) => {
						const date1 = new Date(projection1.dateTimeStr);
						const date2 = new Date(projection2.dateTimeStr);
						return date1 - date2;
					});

				setProjections(sortedProjections);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getProjections();
	}, [searchQuery, selectedDate]);

	const projectionDates = [
		...new Set(
			projections.map((projection) => projection.dateTimeStr.split('T')[0])
		),
	];

	const getMovieUrl = (movieId) => {
		return `/movies/${movieId}`;
	};

	const buyTicket = (projectionId) => {
		return `/tickets/buy/projections/${projectionId}`;
	};

	const goToAddHandler = () => {
		navigate('/projections/add');
	};

	const ticketLists = (projectionId) => {
		return navigate(`/tickets/projection/${projectionId}`);
	};

	const deleteHandler = async (projectionId) => {
		try {
			await CinemaAxios.delete(`/projections/${projectionId}`);
			setProjections(
				projections.filter((movie) => movie.id !== projectionId)
			);
			toast.success('Projection was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error(`Failed to delete the projection. Please try again!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	const handleSearchDate = (date) => {
		if (selectedDate === date) {
			setSelectedDate('');
		} else {
			setSelectedDate(date);
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
			<h1>Projections</h1>
			<div className={styles['date-picker-container']}>
				{projectionDates.map((date, index) => (
					<div
						key={index}
						className={`${styles['date-item']} ${
							selectedDate === date ? styles['active'] : ''
						}`}
						onClick={() => handleSearchDate(date)}
					>
						<FaCalendarAlt className={styles['calendar-icon']} />
						{date}
					</div>
				))}
			</div>
			<Table
				items={
					selectedDate
						? projections.filter(
								(projection) =>
									projection.dateTimeStr.split('T')[0] === selectedDate
						  )
						: projections
				}
				title={`Projections`}
				url={getMovieUrl}
				buy={buyTicket}
				delete={deleteHandler}
				ticketLists={ticketLists}
				user={user}
				role={role}
			/>
			{role === 'ROLE_ADMIN' && (
				<div className={styles.addButton}>
					<Button className='blue' onClick={goToAddHandler}>
						Add
					</Button>
				</div>
			)}
		</div>
	);
};
export default Projections;
