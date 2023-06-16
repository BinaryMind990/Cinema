import { useParams } from 'react-router-dom';
import styles from './EditUser.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import EditUserForm from './EditForms/EditUserForm';
import ChangePasswordForm from './EditForms/ChangePasswordForm';
import ChangeRoleForm from './EditForms/ChangeRoleForm';
import Loader from 'components/UI/Loader/Loader';
import AdminChangePasswordForm from './EditForms/AdminChangePasswordForm';
import ErrorModal from 'components/UI/Modals/ErrorModal';
import { userClient } from 'apis/CinemaClient/UserClient/UserClient';

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
	const [errorModal, setErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await userClient.edit(id, editUserData);
			navigate(`/account/${id}`);
		} catch (error) {
			console.log(error);
			return;
		}
	};

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		try {
			await userClient.editPassword(id, editUserData);
			navigate(`/account/${id}`);
		} catch (error) {
			console.log(error.response);
			setErrorMessage(error.response.data);
			setErrorModal(true);
			return;
		}
	};
	const handleAdminPasswordChange = async (e) => {
		e.preventDefault();
		try {
			await userClient.adminEditPassword(id, editUserData);
			navigate(`/users`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleRoleChange = async (e) => {
		e.preventDefault();
		await userClient.editRole(id, editUserData);
		navigate(`/users`);
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles['edit-user-container']}>
			{errorModal && (
				<ErrorModal
					title='Error'
					message={errorMessage}
					onClose={() => setErrorModal(false)}
				/>
			)}
			<div className='title-wrapper'>
				<h1>Edit user</h1>
			</div>
			<div className='page-wrapper'>
				<EditUserForm
					editUserData={editUserData}
					handleFormChange={handleFormChange}
					handleSubmit={handleSubmit}
				/>
				{role === 'ROLE_ADMIN' && editUserData.id !== userId ? (
					<>
						<AdminChangePasswordForm
							editUserData={{
								...editUserData,
								password: editUserData.password || '',
							}}
							handleFormChange={handleFormChange}
							handleSubmit={handleAdminPasswordChange}
						/>
						<ChangeRoleForm
							editUserData={editUserData}
							handleFormChange={handleFormChange}
							handleSubmit={handleRoleChange}
						/>
					</>
				) : (
					<ChangePasswordForm
						editUserData={{
							...editUserData,
							oldPassword: editUserData.oldPassword || '',
						}}
						handleFormChange={handleFormChange}
						handleSubmit={handlePasswordChange}
					/>
				)}
			</div>
		</div>
	);
};

export default EditUser;
