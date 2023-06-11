import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './User.module.css';
import { CircleLoader } from 'react-spinners';
import Button from 'components/UI/Button';
import { userClient } from 'apis/CinemaClient';
import { mapKeyToDisplay } from 'utils/MapKeyHelper';
import { NavigateContext } from 'contexts/NavigateContext';

const User = () => {
	const { editUser } = useContext(NavigateContext);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const getUserById = async (id) => {
			try {
				const res = await userClient.getById(id);

				setUser(res);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getUserById(id);
	}, [id]);

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
			{Object.entries(user).map(([key, value]) => {
				if (key === 'tickets' || key === 'id') return null;
				const displayKey = mapKeyToDisplay(key);
				return <p key={key}>{`${displayKey}: ${value}`}</p>;
			})}
			<div className={styles['button-wrapper']}>
				<Button className='orange' onClick={() => editUser(user.id)}>
					Edit
				</Button>
			</div>
			{user.tickets.map((ticket) => (
				<div key={ticket.id}>
					{Object.entries(ticket).map(([key, value]) => {
						if (key === 'id' || key === 'projectionId') return null;
						const displayKey = mapKeyToDisplay(key);
						let displayValue = value;
						if (key === 'hall') {
							displayValue = value.split(' ')[1];
						} else if (key === 'price') {
							displayValue = `${Number(value).toFixed(2)} RSD`;
						}
						return <p key={key}>{`${displayKey}: ${displayValue}`}</p>;
					})}
				</div>
			))}
		</div>
	);
};

export default User;
