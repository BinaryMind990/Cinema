import { useState } from 'react';
import styles from './RegisterUser.module.css';
import CinemaAxios from '../../apis/CinemaAxios';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterUser = (props) => {
	const [userRegData, setUserRegData] = useState({
		userName: '',
		name: '',
		lastName: '',
		eMail: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();

	const registrationSubmitHandle = async (e) => {
		e.preventDefault();

		try {
			await CinemaAxios.post('/users', userRegData);
			toast.success(
				`User ${userRegData.userName} has been registered successfully!`,
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			);

			navigate('/login');
		} catch (error) {
			toast.error('Failed to register user. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	return (
		<div>
			<form
				className={styles['register-user-form']}
				onSubmit={registrationSubmitHandle}
			>
				<div>
					<label htmlFor='userName'>Username:</label>
					<input
						type='text'
						name='userName'
						id='userName'
						value={userRegData.userName}
						onChange={(e) =>
							setUserRegData((prevData) => ({
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
						value={userRegData.name}
						onChange={(e) =>
							setUserRegData((prevData) => ({
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
						value={userRegData.lastName}
						onChange={(e) =>
							setUserRegData((prevData) => ({
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
						value={userRegData.eMail}
						onChange={(e) =>
							setUserRegData((prevData) => ({
								...prevData,
								eMail: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						value={userRegData.password}
						onChange={(e) =>
							setUserRegData((prevData) => ({
								...prevData,
								password: e.target.value,
							}))
						}
					/>
				</div>
				<div>
					<label htmlFor='confirmPassword'>Confirm Password:</label>
					<input
						type='password'
						name='confirmPassword'
						id='confirmPassword'
						value={userRegData.confirmPassword}
						onChange={(e) =>
							setUserRegData((prevData) => ({
								...prevData,
								confirmPassword: e.target.value,
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
export default RegisterUser;
