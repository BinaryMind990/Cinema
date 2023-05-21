import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditUser.module.css';
import { CircleLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import { UserContext } from 'contexts/UserContext';

const EditUser = () => {
	const { editUserSubmitHandle, loading, fetchUserById, user } =
		useContext(UserContext);
	const [editUserData, setEditUserData] = useState({
		userName: '',
		name: '',
		lastName: '',
		eMail: '',
	});

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserById(id);
	}, [id]);

	useEffect(() => {
		if (user) {
			setEditUserData(user);
		}
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await editUserSubmitHandle(id, editUserData);
			navigate('/users');
		} catch (error) {
			toast.error('Failed to update user. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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
			<h1>Edit user</h1>
			<form className={styles['edit-user-form']} onSubmit={handleSubmit}>
				<div>
					<label htmlFor='userName'>Username:</label>
					<input
						type='text'
						name='userName'
						id='userName'
						value={editUserData.userName}
						onChange={(e) =>
							setEditUserData((prevData) => ({
								...prevData,
								userName: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						name='name'
						id='name'
						value={editUserData.name}
						onChange={(e) =>
							setEditUserData((prevData) => ({
								...prevData,
								name: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<label htmlFor='lastName'>Last name:</label>
					<input
						type='text'
						name='lastName'
						id='lastName'
						value={editUserData.lastName}
						onChange={(e) =>
							setEditUserData((prevData) => ({
								...prevData,
								lastName: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id='email'
						value={editUserData.eMail}
						onChange={(e) =>
							setEditUserData((prevData) => ({
								...prevData,
								eMail: e.target.value,
							}))
						}
					/>
				</div>
				<Button className={`blue`} type='submit'>
					Save Changes
				</Button>
			</form>
		</div>
	);
};
export default EditUser;
