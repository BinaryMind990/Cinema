import { useState } from 'react';
import Button from 'components/UI/Button/Button';

const RegistrationForm = ({ onSubmit }) => {
	const [userRegData, setUserRegData] = useState({
		userName: '',
		name: '',
		lastName: '',
		eMail: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(userRegData);
	};

	return (
		<div>
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
