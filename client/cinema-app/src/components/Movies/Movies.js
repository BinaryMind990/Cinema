import { useEffect, useState } from 'react';

import CinemaAxios from '../../apis/CinemaAxios';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

const Movies = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const res = await CinemaAxios.get('/users');
		setUsers(res.data);
	};

	const getUserUrl = (userId) => {
		return `${CinemaAxios.defaults.baseURL}/users/${userId}`;
	};

	const clickHandler = () => {
		console.log('s');
	};

	return (
		<div>
			<h1>Movies</h1>
			<table>
				<thead>
					<tr>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link
									className={styles.link}
									to={getUserUrl(user.id)}
									onClick={clickHandler}
								>
									{user.name}
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default Movies;
