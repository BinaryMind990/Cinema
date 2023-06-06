import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './User.module.css';
import { CircleLoader } from 'react-spinners';
import { UserContext } from '../../contexts/UserContext';

const User = () => {
	const { fetchUserById, selectedUser, loading } = useContext(UserContext);
	const { id } = useParams();

	useEffect(() => {
		fetchUserById(id);
	}, [id]);

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	console.log('USER', id);
	console.log('USER', selectedUser);

	return (
		<div className={styles['user-info']}>
			<h1>User</h1>
			<p>
				<span className={styles.label}>Name:</span>
				<span>{selectedUser?.name}</span>
			</p>
			<p>
				<span className={styles.label}>Last Name:</span>
				<span>{selectedUser?.lastName}</span>
			</p>
			<p>
				<span className={styles.label}>Email:</span>
				<span>{selectedUser?.eMail}</span>
			</p>
			<p>
				<span className={styles.label}>Username:</span>
				<span>{selectedUser?.userName}</span>
			</p>
		</div>
	);
};
export default User;
