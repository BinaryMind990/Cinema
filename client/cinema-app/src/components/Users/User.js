import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './User.module.css';
import { CircleLoader } from 'react-spinners';
import { UserContext } from '../../contexts/UserContext';

const User = () => {
	const { fetchUserById, user, loading } = useContext(UserContext);
	const { id } = useParams();

	useEffect(() => {
		fetchUserById(id);
	}, [id, fetchUserById]);

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
			<p>
				<span className={styles.label}>Name:</span>
				<span>{user.name}</span>
			</p>
			<p>
				<span className={styles.label}>Last Name:</span>
				<span>{user.lastName}</span>
			</p>
			<p>
				<span className={styles.label}>Email:</span>
				<span>{user.eMail}</span>
			</p>
			<p>
				<span className={styles.label}>Username:</span>
				<span>{user.userName}</span>
			</p>
		</div>
	);
};
export default User;
