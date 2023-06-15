import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Users.module.css';
import { NavigateContext } from 'contexts/NavigateContext';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchUsers } from 'utils/SearchUtils/SearchHelper';

import { UserContext } from 'contexts/UserContext';
import ConfirmationModal from 'components/UI/Modals/ConfirmationModal';
import Loader from 'components/UI/Loader/Loader';
import { userClient } from 'apis/CinemaClient/UserClient/UserClient';

const Users = () => {
	const { user, role } = useContext(UserContext);

	const { getUserUrl } = useContext(NavigateContext);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');

	const searchData = searchUsers(users, search);
	const userId = user ? user.id : undefined;

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
				<Loader />
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
										{role === 'ROLE_ADMIN' && userId !== user.id && (
											<div className={styles.actions}>
												<ConfirmationModal
													title='Delete user'
													message={`Are you sure you want to delete user ${user.name}?`}
													onConfirm={() => deleteUser(user.id)}
													onCancel={() => {}}
												/>
											</div>
										)}
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
