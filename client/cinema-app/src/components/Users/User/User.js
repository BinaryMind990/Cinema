import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './User.module.css';

import { NavigateContext } from 'contexts/NavigateContext';
import { UserContext } from 'contexts/UserContext';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import { mapKeyToDisplay } from 'utils/MapKey/MapKeyHelperUser';
import { userClient } from 'apis/CinemaClient/UserClient/UserClient';

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
			navigate('/notfound', { replace: true });
		}
	}, [role, userId, id, navigate]);

	if (loading) {
		return (
			<div className='loader-container'>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<div className='title-wrapper'>
				<h1>User</h1>
			</div>
			<div className='page-wrapper'>
				<div className={`form ${styles['user-info']}`}>
					{userById &&
						Object.entries(userById).map(([key, value]) => {
							if (key === 'tickets' || key === 'id') return null;
							const displayKey = mapKeyToDisplay(key);
							return (
								<p key={key}>
									<span className='yellow-text'>{`${displayKey}:`}</span>
									{`${value}`}
								</p>
							);
						})}
					<div className={styles['button-wrapper']}>
						<Button
							className='orange'
							onClick={() => editUser(userById.id)}
						>
							Edit
						</Button>
					</div>
				</div>
				{role !== 'ROLE_ADMIN' && (
					<div className='table-wrapper'>
						{userById &&
						userById.tickets &&
						userById.tickets.length > 0 ? (
							<table className={styles['purchased-tickets']}>
								<caption>
									<h3>Purchased tickets</h3>
								</caption>
								<thead>
									<tr>
										{Object.keys(userById.tickets[0]).map((key) => {
											if (key === 'id' || key === 'projectionId')
												return null;
											const displayKey = mapKeyToDisplay(key);
											return <th key={key}>{displayKey}</th>;
										})}
									</tr>
								</thead>
								<tbody>
									{userById.tickets.map((ticket) => (
										<tr key={ticket.id}>
											{Object.entries(ticket).map(([key, value]) => {
												if (key === 'id' || key === 'projectionId')
													return null;
												const displayValue =
													key === 'hall'
														? value.split(' ')[1]
														: key === 'movieName'
														? value
														: key === 'price'
														? `${Number(value).toFixed(2)} RSD`
														: value;
												return <td key={key}>{displayValue}</td>;
											})}
										</tr>
									))}
								</tbody>
							</table>
						) : (
							''
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default User;
