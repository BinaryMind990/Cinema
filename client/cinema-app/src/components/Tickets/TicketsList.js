import { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { dataClient } from 'apis/CinemaClient';

const TicketsList = () => {
	const [ticketsList, setTicketsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		const getTickets = async () => {
			try {
				const res = await dataClient.getTicketList(id);
				setTicketsList(res);
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

	if (error) {
		return <p>Oops! Something went wrong. Please try again later</p>;
	}

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Sold tickets for projection</h1>
			</div>
			<div className='page-wrapper'>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Time</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						{ticketsList.map((ticket) => (
							<tr key={ticket.id}>
								<td>
									{ticket.ticketSellDate
										.split('T')[0]
										.split('-')
										.reverse()
										.join('-')}
								</td>
								<td>{ticket.ticketSellTime}</td>
								<td>{ticket.userName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default TicketsList;
