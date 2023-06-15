import { useContext, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CinemaAxios from '../../../apis/CinemaAxios';
import Table from './TableProjections/Table';
import Button from '../../UI/Button/Button';
import styles from './Projections.module.css';
import { UserContext } from '../../../contexts/UserContext';
import { searchRepertoir } from 'utils/SearchUtils/SearchHelper';
import { DataContext } from 'contexts/MainContext';
import { NavigateContext } from 'contexts/NavigateContext';
import Loader from 'components/UI/Loader/Loader';
import { projectionClient } from 'apis/CinemaClient/ProjectionClient/ProjectionClient';

const Projections = () => {
	const { user, role } = useContext(UserContext);
	const { movies } = useContext(DataContext);

	const { getMovieUrl, projectionAddHandler, ticketLists } =
		useContext(NavigateContext);

	const [projections, setProjections] = useState([]);
	const [searchQuery] = useState({ date: '' });
	const [selectedDate, setSelectedDate] = useState('');
	const [search, setSearch] = useState('');
	const [sortOrder, setSortOrder] = useState('');
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

	useEffect(() => {
		if (projections.length > 0 && !selectedDate) {
			setSelectedDate(
				projections[0].dateTimeStr
					.split('T')[0]
					.split('-')
					.reverse()
					.join('-')
			);
		}
	}, [projections, selectedDate]);

	const buyTicket = (projectionId) => {
		if (user) {
			return navigate(`/tickets/buy/projections/${projectionId}`);
		} else {
			return navigate(`/`);
		}
	};

	const deleteHandler = async (projectionId) => {
		await projectionClient.deleteProjection(projectionId);
		setProjections(projections.filter((movie) => movie.id !== projectionId));
	};

	const projectionDates = [
		...new Set(
			projections.map((projection) =>
				projection.dateTimeStr.split('T')[0].split('-').reverse().join('-')
			)
		),
	];

	const handleSearchDate = (date) => {
		if (selectedDate === date) {
			setSelectedDate('');
		} else {
			setSelectedDate(date);
		}
		setSortOrder('');
	};

	const searchData = searchRepertoir(projections, search, sortOrder);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleSortOrderChange = (e) => {
		setSortOrder(e.target.value);
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
				<h1>Repertoire</h1>
				<div className='search'>
					<Input
						className='search-input'
						placeholder='Search...'
						prefix={<SearchOutlined />}
						onChange={handleSearch}
					/>
				</div>
			</div>
			<div className='page-wrapper'>
				{role === 'ROLE_ADMIN' && (
					<div className={styles['add-button']}>
						<Button className='blue' onClick={projectionAddHandler}>
							Add projection
						</Button>
					</div>
				)}
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
				<div className={styles['sort-radio-wrapper']}>
					<div className={styles['sort-radio']}>
						<span>Sort by Price:</span>
						<label>
							<input
								type='radio'
								value='asc'
								checked={sortOrder === 'asc'}
								onChange={handleSortOrderChange}
							/>
							Asc
						</label>
						<label>
							<input
								type='radio'
								value='desc'
								checked={sortOrder === 'desc'}
								onChange={handleSortOrderChange}
							/>
							Desc
						</label>
					</div>
				</div>
				<Table
					items={
						selectedDate
							? searchData.filter(
									(projection) =>
										projection.dateTimeStr
											.split('T')[0]
											.split('-')
											.reverse()
											.join('-') === selectedDate
							  )
							: searchData
					}
					title={`Projections`}
					url={getMovieUrl}
					buy={buyTicket}
					delete={deleteHandler}
					ticketLists={ticketLists}
					user={user}
					role={role}
					movies={movies}
				/>
			</div>
		</div>
	);
};
export default Projections;
