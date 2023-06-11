import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Users.module.css';
import Button from '../UI/Button';
import { CircleLoader } from 'react-spinners';
import { FaTrash } from 'react-icons/fa';

import { NavigateContext } from 'contexts/NavigateContext';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchUsers } from 'utils/SearchHelper';
import { userClient } from 'apis/CinemaClient';

const Users = () => {
	const { getUserUrl } = useContext(NavigateContext);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');

	const searchData = searchUsers(users, search);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await userClient.get('/users');
				setUsers(res);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		getUsers();
	}, []);

	const deleteUser = async (userId) => {
		await userClient.delete(userId);
		setUsers(users.filter((user) => user.id !== userId));
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
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
				<div className='search'>
					<Input
						className='search-input'
						placeholder='Search...'
						prefix={<SearchOutlined />}
						onChange={handleSearch}
					/>
				</div>
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
						{searchData.map((user) => {
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
