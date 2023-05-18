import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaAxios from '../../apis/CinemaAxios';
import styles from './EditUser.module.css';
import { CircleLoader } from 'react-spinners';
import { withNavigation } from '../../routeconf';
import Button from '../UI/Button';
import { toast } from 'react-toastify';

const EditUser = (props) => {
	const [editUserData, setEditUserData] = useState({
		userName: '',
		name: '',
		lastName: '',
		eMail: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await CinemaAxios.get(`/users/${id}`);
				setEditUserData(res.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		getUser();
	}, [id]);

	const editUserSubmitHandle = async (e) => {
		e.preventDefault();
		try {
			await CinemaAxios.put(`/users/${id}`, editUserData);
			toast.success(
				`User ${editUserData.userName} was edited successfully!`,
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			);

			props.navigate('/users');
		} catch (error) {
			toast.error('An error occurred. Please try again!', {
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
			<form
				className={styles['edit-user-form']}
				onSubmit={editUserSubmitHandle}
			>
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
					<label htmlFor='lastName'>Name:</label>
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
				{/* TODO */}
				{/* <div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						value={editUserData.password}
						onChange={(e) =>
							setEditUserData((prevData) => ({
								...prevData,
								password: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<label htmlFor='confirmPassword'>Confirm Password:</label>
					<input
						type='confirmPassword'
						name='confirmPassword'
						id='confirmPassword'
						value={editUserData.confirmPassword}
						onChange={(e) =>
							setEditUserData((prevData) => ({
								...prevData,
								confirmPassword: e.target.value,
							}))
						}
					/>
				</div> */}
				<Button className={`blue`} type='submit'>
					Save Changes
				</Button>
			</form>
		</div>
	);
};
export default withNavigation(EditUser);
