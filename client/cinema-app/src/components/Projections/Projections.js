import { useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import Table from '../UI/Table';
import Button from '../UI/Button';
import styles from './Projections.module.css';
import { CircleLoader } from 'react-spinners';
import { FaCalendarAlt } from 'react-icons/fa';
import { withNavigation } from '../../routeconf';
import { toast } from 'react-toastify';

const Projections = (props) => {
	const [projections, setProjections] = useState([]);
	const [searchQuery, setSearchQuery] = useState({ date: '' });
	const [selectedDate, setSelectedDate] = useState('');
	const [loading, setLoading] = useState(true);

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

				const today = new Date(); // Dobijanje trenutnog datuma

				const sortedProjections = res.data
					.filter(
						(projection) => new Date(projection.dateTimeStr) >= today
					) // Filtriranje projekcija koje su u ili posle današnjeg datuma
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
	}, [searchQuery]);

	const projectionDates = projections.map(
		(projection) => projection.dateTimeStr.split('T')[0]
	);

	const getMovieUrl = (movieId) => {
		const url = `/movies/${movieId}`;
		return url;
	};

	const buyTicket = (projectionId) => {
		const buyUrl = `/tickets/buy/projections/${projectionId}`;
		return buyUrl;
	};

	const goToAddHandler = () => {
		props.navigate('/projections/add');
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
			toast.error(`Projection wasn't deleted successfully!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	const handleSearchDate = (date) => {
		if (selectedDate === date) {
			setSelectedDate('');
			setSearchQuery({ date: '' });
		} else {
			setSelectedDate(date);
			setSearchQuery({ date });
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
				items={projections}
				title={`Projections`}
				url={getMovieUrl}
				buy={buyTicket}
				delete={deleteHandler}
			/>
			<div className={styles.addButton}>
				<Button className='blue' onClick={goToAddHandler}>
					Add
				</Button>
			</div>
		</div>
	);
};
export default withNavigation(Projections);
