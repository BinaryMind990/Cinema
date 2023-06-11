import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './User.module.css';
import { CircleLoader } from 'react-spinners';
import Button from 'components/UI/Button';
import { userClient } from 'apis/CinemaClient';
import { mapKeyToDisplay } from 'utils/MapKeyHelper';
import { NavigateContext } from 'contexts/NavigateContext';
import { UserContext } from 'contexts/UserContext';

const User = () => {
	const { user, role } = useContext(UserContext);

	const { editUser } = useContext(NavigateContext);
	const [userById, setUserById] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	const userId = user ? user.id : undefined;

	useEffect(() => {
		const getUserById = async (id) => {
			try {
				const res = await userClient.getById(id);

				setUserById(res);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getUserById(id);
	}, [id]);

	useEffect(() => {
		if (role !== 'ROLE_ADMIN' && Number(id) !== userId) {
			navigate('/', { replace: true });
		}
	}, [role, userId, id, navigate]);

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
				Object.entries(userById).map(([key, value]) => {
					if (key === 'tickets' || key === 'id') return null;
					const displayKey = mapKeyToDisplay(key);
					return <p key={key}>{`${displayKey}: ${value}`}</p>;
				})}
			<div className={styles['button-wrapper']}>
				<Button className='orange' onClick={() => editUser(userById.id)}>
					Edit
				</Button>
			</div>
			{userById &&
				userById.tickets.map((ticket) => (
					<div key={ticket.id}>
						{Object.entries(ticket).map(([key, value]) => {
							if (key === 'id' || key === 'projectionId') return null;
							const displayKey = mapKeyToDisplay(key);
							let displayValue = value;
							if (key === 'hall') {
								displayValue = value.split(' ')[1];
							} else if (key === 'price') {
								displayValue = `${Number(value).toFixed(2)} RSD`;
							} else if (
								key === 'projectionDate' ||
								key === 'ticketBuyDate'
							) {
								displayValue = value
									.split('T')[0]
									.split('-')
									.reverse()
									.join('-');
							}
							return <p key={key}>{`${displayKey}: ${displayValue}`}</p>;
						})}
					</div>
				))}
		</div>
	);
};

export default User;
