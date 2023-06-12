import { useParams } from 'react-router-dom';
import styles from './EditUser.module.css';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CinemaAxios from 'apis/CinemaAxios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import EditUserForm from './EditForms/EditUserForm';
import ChangePasswordForm from './EditForms/ChangePasswordForm';
import ChangeRoleForm from './EditForms/ChangeRoleForm';
import { userClient } from 'apis/CinemaClient';

const EditUser = () => {
	const { user, role } = useContext(UserContext);
	const [editUserData, setEditUserData] = useState({
		userName: '',
		name: '',
		lastName: '',
		eMail: '',
		oldPassword: '',
		password: '',
		confirmPassword: '',
		role: '',
	});
	const [loading, setLoading] = useState(true);

	const { id } = useParams();
	const navigate = useNavigate();

	const userId = user ? user.id : undefined;

	useEffect(() => {
		const getUserById = async (id) => {
			try {
				const res = await userClient.getById(id);
				setEditUserData(res);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getUserById(id);
	}, [id]);

	useEffect(() => {
		if (role !== 'ROLE_ADMIN' && Number(id) !== userId) {
			navigate('/', { replace: true });
		}
	}, [role, userId, id, navigate]);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setEditUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRoleChange = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.put(`/users/changeRole/${id}/${editUserData.role}`);
			toast.success('User role changed successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to change user role. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.put(`/users/changePassword/${id}`, editUserData);
			toast.success('User password changed successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to change user password. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await userClient.edit(id, editUserData);
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<SyncLoader size={75} />
			</div>
		);
	}

	return (
		<div className={styles['edit-user-container']}>
			<div className='title-wrapper'>
				<h1>Edit user</h1>
			</div>
			<div className='page-wrapper'>
				<EditUserForm
					editUserData={editUserData}
					handleFormChange={handleFormChange}
					handleSubmit={handleSubmit}
				/>
				<ChangePasswordForm
					editUserData={editUserData}
					handleFormChange={handleFormChange}
					handleSubmit={handlePasswordChange}
				/>
				{role === 'ROLE_ADMIN' && (
					<ChangeRoleForm
						editUserData={editUserData}
						handleFormChange={handleFormChange}
						handleSubmit={handleRoleChange}
					/>
				)}
			</div>
		</div>
	);
};

export default EditUser;
