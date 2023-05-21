import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Users.module.css';
import Button from '../UI/Button';
import { CircleLoader } from 'react-spinners';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Users = () => {
	const { users, loading, deleteUser, getUserUrl } = useContext(UserContext);

	const navigate = useNavigate();

	const goToEditHandler = (userId) => {
		navigate(`/users/edit/${userId}`);
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
												onClick={() => deleteUser(user.id)}
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
export default Users;
