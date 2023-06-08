import { useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import { CircleLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

const TicketsList = () => {
	const [ticketsList, setTicketsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		const getTickets = async () => {
			try {
				const res = await CinemaAxios.get(`/tickets/projection/${id}`);
				setTicketsList(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setError(true);
				setLoading(false);
			}
		};
		getTickets();
	}, [id]);

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	console.log('TICKET', ticketsList);

	if (error) {
		return <p>Oops! Something went wrong. Please try again later</p>;
	}

	return (
		<div>
			<h1>Sold tickets for projection</h1>
			<ul>
				{ticketsList.map((ticket) => (
					<li key={ticket.id}>
						{/* <p>Title: {ticket.ticketSellDate}</p> */}
						<p>Date: {ticket.ticketSellDate}</p>
						<p>Time: {ticket.ticketSellTime}</p>
						<p>Username: {ticket.userName}</p>
						{/* <p>Type: {ticket.type}</p> */}
						{/* <p>Seat number: {ticket.seat}</p> */}
					</li>
				))}
			</ul>
		</div>
	);
};
export default TicketsList;
