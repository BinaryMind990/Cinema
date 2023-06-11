import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '../UI/Button';
import styles from './BuyTicket.modul.css';
import { CircleLoader } from 'react-spinners';
import { dataClient, ticketClient } from 'apis/CinemaClient';

const BuyTicket = () => {
	const [projections, setProjection] = useState({});
	const [ticketData, setTicketData] = useState({
		projectionId: '',
		seatNumber: '',
	});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getProjection = async () => {
			try {
				const res = await dataClient.getProjectionById(id);
				setProjection(res);
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
		await ticketClient.buyTicket(ticketData);
		navigate(`/projections`);
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
			<div className='title-wrapper'>
				<h1>Projection: {projections?.movieName}</h1>
			</div>
			<div className='page-wrapper'>
				<p>Date: {projections?.dateTimeStr.split('T').join(' ')}</p>
				<p>Hall: {projections?.hall}</p>
				<p>Type: {projections?.typeName}</p>
				<p>Price: {projections?.ticketPrice}</p>
				<form className={'form'} onSubmit={buyTicketHandler}>
					<label htmlFor='seatNumber'>Seat number: </label>
					<div>
						<select
							name='seatNumber'
							id='seatNumber'
							onChange={(e) =>
								setTicketData({
									...ticketData,
									projectionId: projections?.id,
									seatNumber: e.target.value,
								})
							}
						>
							<option>Choose seat</option>
							{projections &&
								projections.seats &&
								projections.seats.map((seat) => {
									return (
										<option key={seat} value={seat.id}>
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
		</div>
	);
};
export default BuyTicket;
