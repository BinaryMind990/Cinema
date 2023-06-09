import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './User.module.css';
import { CircleLoader } from 'react-spinners';
import CinemaAxios from 'apis/CinemaAxios';
import Button from 'components/UI/Button';
import { userClient } from 'apis/CinemaClient';

const User = () => {
	const [userById, setUserById] = useState(null);
	const [userTickets, setUserTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getUserById = async (id) => {
			try {
				const res = await userClient.getById(id);
				const result = await CinemaAxios.get(`/tickets/user/${id}`);

				setUserById(res);
				setUserTickets(result.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getUserById(id);
	}, [id]);

	const goToEditHandler = (userId) => {
		navigate(`/account/edit/${userId}`);
	};

	const mapKeyToDisplay = (key) => {
		switch (key) {
			case 'ticketSellDate':
				return 'Ticket sell date';
			case 'ticketSellTime':
				return 'Ticket sell time';
			case 'userName':
				return 'Username';
			case 'name':
				return 'Name';
			case 'lastName':
				return 'Last name';
			case 'role':
				return 'Role';
			default:
				return key;
		}
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	return (
		<div className={styles['user-info']}>
			<h1>User</h1>
			{userById &&
				Object.entries(userById).map(
					([key, value]) =>
						key !== 'id' && (
							<p key={key}>
								<span className={styles.label}>
									{mapKeyToDisplay(key)}:
								</span>
								<span>{value}</span>
							</p>
						)
				)}
			<div>
				<Button
					className='orange'
					onClick={() => goToEditHandler(userById.id)}
				>
					Edit
				</Button>
			</div>
			<div>
				{Object.values(userTickets).map((ticket) => (
					<div key={ticket.id}>
						{Object.entries(ticket).map(
							([key, value]) =>
								key !== 'id' &&
								key !== 'userId' && (
									<p key={key}>
										<span className={styles.label}>
											{mapKeyToDisplay(key)}:
										</span>
										<span>{value}</span>
									</p>
								)
						)}
						<div className={styles.separator} />
					</div>
				))}
			</div>
		</div>
	);
};
export default User;
