import { userClient } from 'apis/CinemaClient/UserClient/UserClient';
import Button from 'components/UI/Button/Button';
import ErrorModal from 'components/UI/Modals/ErrorModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ onSubmit }) => {
	const [userRegData, setUserRegData] = useState({
		userName: '',
		name: '',
		lastName: '',
		eMail: '',
		password: '',
		confirmPassword: '',
	});
	const [users, setUsers] = useState([]);
	const [errorModal, setErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const res = await userClient.get('/users');
			setUsers(res);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const existingUsername = users.find(
			(user) => user.username === userRegData.userName
		);
		const existingEmail = users.find(
			(user) => user.eMail === userRegData.eMail
		);
		if (existingUsername) {
			setErrorMessage('Username already exists.');
			setErrorModal(true);
			return;
		} else if (existingEmail) {
			setErrorMessage('User with that email already exists.');
			setErrorModal(true);
			return;
		} else {
			onSubmit(userRegData);
			navigate('/projections');
		}
	};

	return (
		<div>
			{errorModal && (
				<ErrorModal
					title='Error'
					message={errorMessage}
					onClose={() => setErrorModal(false)}
				/>
			)}

			<form className={'form'} onSubmit={handleSubmit}>
				<div>
					<label htmlFor='userName'>Username:</label>
					<input
						required
						type='text'
						name='userName'
						id='userName'
						value={userRegData.userName}
						minLength={3}
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
						required
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
						required
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
						required
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
						required
						type='password'
						name='password'
						id='password'
						value={userRegData.password}
						minLength={5}
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
						required
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
				<div className='form-button'>
					<Button className={`blue full-width`} type='submit'>
						Sign up
					</Button>
				</div>
			</form>
		</div>
	);
};
export default RegistrationForm;
