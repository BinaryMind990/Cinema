import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Users.module.css';
import Button from '../UI/Button';
import { CircleLoader } from 'react-spinners';
import { FaTrash } from 'react-icons/fa';
import CinemaAxios from 'apis/CinemaAxios';
import { toast } from 'react-toastify';
import { userClient } from 'apis/CinemaClient';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	const getUsers = async () => {
		try {
			const res = await CinemaAxios.get('/users');
			setUsers(res.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		getUsers();
	}, []);

	const getUserUrl = (userId) => {
		return `/account/${userId}`;
	};

	const deleteUser = async (userId) => {
		try {
			await userClient.delete(userId);
			setUsers(users.filter((user) => user.id !== userId));
		} catch (error) {
			toast.error('Failed to delete user. Please try again.', {
				position: toast.POSITION.TOP_RIGHT,
			});
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
		<div>
			<div className='title-wrapper'>
				<h1>Users</h1>
			</div>
			<div className='page-wrapper'>
				<table className={styles['users-table']}>
					<thead>
						<tr>
							<th>Users</th>
							<th>Role</th>
							<th>Registration date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user.id}>
									<td>
										<Link
											className={styles.link}
											to={getUserUrl(user.id)}
										>
											{user.username}
										</Link>
									</td>
									<td>{user.userRole}</td>
									<td>
										{user.registrationDateTime.split('T').join(' ')}
									</td>
									<td>
										<div className={styles.actions}>
											<Button
												className='red'
												onClick={() => deleteUser(user.id)}
											>
												<FaTrash className={styles.trashIcon} />
											</Button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default Users;
