import { useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import { CircleLoader } from 'react-spinners';

const TicketsList = () => {
	const [ticketsList, setTicketsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getTickets();
	}, []);

	const getTickets = async () => {
		try {
			const res = await CinemaAxios.get(`/tickets`);
			setTicketsList(res.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(true);
			setLoading(false);
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
			<h1>Tikets</h1>
			<ul>
				{ticketsList.map((ticket) => (
					<li key={ticket.id}>
						<p>Title: {ticket.movieName}</p>
						<p>Date: {ticket.date}</p>
						<p>Time: {ticket.time}</p>
						<p>Hall: {ticket.hall}</p>
						<p>Type: {ticket.type}</p>
						<p>Seat number: {ticket.seat}</p>
						<p>Price: {ticket.price.toFixed(2)}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
export default TicketsList;
