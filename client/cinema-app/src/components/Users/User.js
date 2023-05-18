import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaAxios from '../../apis/CinemaAxios';
import styles from './User.module.css';
import { CircleLoader } from 'react-spinners';

const User = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await CinemaAxios.get(`/users/${id}`);
				setUser(res.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getUser();
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
