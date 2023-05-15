import { useEffect, useState } from 'react';
import { withNavigation } from '../../routeconf';
import CinemaAxios from '../../apis/CinemaAxios';
import { useParams } from 'react-router-dom';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import styles from './BuyTicket.modul.css';
import { CircleLoader } from 'react-spinners';

const BuyTicket = (props) => {
	const [projections, setProjection] = useState({});
	const [ticketData, setTicketData] = useState({
		projectionId: '',
		seatNumber: '',
	});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const getProjection = async () => {
			try {
				const res = await CinemaAxios.get(`/projections/${id}`);
				setProjection(res.data);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};
		getProjection();
	}, [id]);

	const buyTicketHandler = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.post(`/tickets`, ticketData);
			toast.success('You buy ticket successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			props.navigate('/tickets');
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
		<div className={styles['buy-ticket-container']}>
			<h1>Projection: {projections.movieName}</h1>
			<p>Date: {projections.dateTimeStr}</p>
			<p>Hall: {projections.hall}</p>
			<p>Type: {projections.typeName}</p>
			<p>Price: {projections.ticketPrice}</p>
			<form
				className={styles['buy-ticket-form']}
				onSubmit={buyTicketHandler}
			>
				<label htmlFor='seatNumber'>Seat number: </label>
				<div>
					<select
						name='seatNumber'
						id='seatNumber'
						onChange={(e) =>
							setTicketData({
								...ticketData,
								projectionId: projections.id,
								seatNumber: e.target.value,
							})
						}
					>
						<option>Choose seat</option>
						{projections.seats &&
							projections.seats.map((seat) => {
								return (
									<option key={seat.id} value={seat.id}>
										{seat}
									</option>
								);
							})}
					</select>
				</div>
				<div className={styles.buttonWrapper}>
					<Button className={`ticket-button blue`} type='submit'>
						Buy
					</Button>
				</div>
			</form>
		</div>
	);
};
export default withNavigation(BuyTicket);
