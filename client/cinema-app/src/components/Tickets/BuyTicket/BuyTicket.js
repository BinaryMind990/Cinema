import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '../../UI/Button';
import './BuyTicket.css';
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
		<div>
			<div className='title-wrapper'>
				<h1>Projection: {projections?.movieName}</h1>
			</div>
			<div className='page-wrapper'>
				<form className={'form buy-ticket'} onSubmit={buyTicketHandler}>
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
						<p>
							<span className='yellow-text'>Date:</span>
							{projections?.dateTimeStr.split('T').join(' ')}
						</p>
						<p>
							<span className='yellow-text'>Hall:</span>
							{projections?.hall}
						</p>
						<p>
							<span className='yellow-text'>Type:</span>
							{projections?.typeName}
						</p>
						<p>
							<span className='yellow-text'>Price:</span>
							{projections?.ticketPrice}
						</p>
					</div>
					<div className='button-wrapper'>
						<Button className={`blue`} type='submit'>
							Buy ticket
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default BuyTicket;
