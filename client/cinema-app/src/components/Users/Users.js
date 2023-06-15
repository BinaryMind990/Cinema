import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Users.module.css';
import { userClient } from 'apis/CinemaClient/UserClient/UserClient';
import { UserContext } from 'contexts/UserContext';
import { NavigateContext } from 'contexts/NavigateContext';
import ConfirmationModal from 'components/UI/Modals/ConfirmationModal';
import { searchUsers } from 'utils/SearchUtils/SearchHelper';
import Loader from 'components/UI/Loader/Loader';

const Users = () => {
	const { user, role } = useContext(UserContext);
	const { getUserUrl } = useContext(NavigateContext);
	const [users, setUsers] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');

	const searchData = searchUsers(users, search);
	const userId = user ? user.id : undefined;

	useEffect(() => {
		getUsers(pageNo - 1);
	}, [pageNo]);
	const getUsers = async (newPageNo) => {
		try {
			const conf = {
				params: {
					pageNo: newPageNo,
				},
			};
			const response = await userClient.get(conf);
			setUsers(response.data);
			console.log(response.headers);
			setTotalPages(response.headers['total-pages'] + 0);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const deleteUser = async (userId) => {
		await userClient.delete(userId);
		setUsers(users.filter((user) => user.id !== userId));
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handlePageChange = (newPageNo) => {
		setPageNo(newPageNo);
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
				<Pagination
					defaultCurrent={pageNo}
					total={totalPages}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
};
export default Users;
