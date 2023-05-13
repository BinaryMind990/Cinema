import { useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import Table from '../UI/Table';
import Button from '../UI/Button';
import styles from './Projections.module.css';
import { CircleLoader } from 'react-spinners';
import { withNavigation } from '../../routeconf';
import { toast } from 'react-toastify';

const Projections = (props) => {
	const [projections, setProjections] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getProjections();
	}, []);

	const getProjections = async () => {
		try {
			const res = await CinemaAxios.get('/projections');
			setProjections(res.data);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};
	const getMovieUrl = (movieId) => {
		const url = `/movies/${movieId}`;
		return url;
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
			toast.success('Movie was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Error occured please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	if (error) {
		return <p>Oops! Something went wrong. Please try again later</p>;
	}

	return (
		<div>
			<Table
				items={projections}
				title={`Projections`}
				url={getMovieUrl}
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
