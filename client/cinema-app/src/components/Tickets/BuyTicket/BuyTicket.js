import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import './BuyTicket.css';
import Loader from 'components/UI/Loader/Loader';
import { dataClient } from 'apis/CinemaClient/DataClient/DataClient';
import { ticketClient } from 'apis/CinemaClient/TicketClient/TicketClient';
import ErrorModal from 'components/UI/Modals/ErrorModal';

const BuyTicket = () => {
	const [projections, setProjection] = useState({});
	const [ticketData, setTicketData] = useState({
		projectionId: '',
		seatNumber: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [errorModal, setErrorModal] = useState(false);
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
				setLoading(false);
			}
		};
		getProjection();
	}, [id]);

	const buyTicketHandler = async (e) => {
		e.preventDefault();
		try {
			await ticketClient.buyTicket(ticketData);
			navigate(`/projections`);
		} catch (error) {
			setErrorMessage(error.response.data);
			setErrorModal(true);
			return;
		}
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
			{errorModal && (
				<ErrorModal
					title='Error'
					message={errorMessage}
					onClose={() => setErrorModal(false)}
				/>
			)}
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
