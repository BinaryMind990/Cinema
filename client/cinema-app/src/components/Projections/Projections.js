import { useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import Table from '../UI/Table';
import Button from '../UI/Button';
import styles from './Projections.module.css';
import { withNavigation } from '../../routeconf';

const Projections = (props) => {
	const [projections, setProjections] = useState([]);

	useEffect(() => {
		getProjections();
	}, []);

	const getProjections = async () => {
		try {
			const res = await CinemaAxios.get('/projections');
			setProjections(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const getMovieUrl = (movieId) => {
		const url = `/movies/${movieId}`;
		return url;
	};

	const goToAddHandler = () => {
		props.navigate('/projects/add');
	};

	return (
		<div>
			<Table items={projections} title={`Projections`} url={getMovieUrl} />
			<div className={styles.addButton}>
				<Button className='blue' onClick={goToAddHandler}>
					Add
				</Button>
			</div>
		</div>
	);
};
export default withNavigation(Projections);
