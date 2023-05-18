import { useEffect, useState } from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import { Link } from 'react-router-dom';
import styles from './Users.module.css';
import Button from '../UI/Button';
import { CircleLoader } from 'react-spinners';
import { FaTrash } from 'react-icons/fa';
import { withNavigation } from '../../routeconf';
import { toast } from 'react-toastify';

const Users = (props) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUsers();
	}, []);

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

	const goToEditHandler = (userId) => {
		props.navigate(`/users/edit/${userId}`);
	};

	const deleteHandler = async (userId) => {
		try {
			await CinemaAxios.delete(`/users/${userId}`);
			setUsers(users.filter((user) => user.id !== userId));
			toast.success('User was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to delete user. Please try again.', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const getUserUrl = (userId) => {
		return `/users/${userId}`;
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
			<h1>Users</h1>
			<table className={styles['users-table']}>
				<thead>
					<tr>
						<th>Users</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td className={styles.cell}>
									<Link
										className={styles.link}
										to={getUserUrl(user.id)}
									>
										{user.userName}
									</Link>
									<div className={styles.actions}>
										<div className={styles.buttonWrapper}>
											<Button
												className='orange'
												onClick={() => goToEditHandler(user.id)}
											>
												Edit
											</Button>
										</div>
										<div className={styles.buttonWrapper}>
											<Button
												className='red'
												onClick={() => deleteHandler(user.id)}
											>
												<FaTrash className={styles.trashIcon} />
											</Button>
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default withNavigation(Users);
