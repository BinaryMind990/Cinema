import { useState } from 'react';
import styles from './Login.module.css';
import Button from 'components/UI/Button/Button';

const LoginForm = ({ handleLogin, goToRegisterPage }) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		handleLogin(userName, password);
	};

	return (
		<div className={`form`}>
			<form onSubmit={handleSubmitLogin}>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					name='username'
					id='username'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type='submit' className={`button blue full-width`}>
					Log in
				</Button>
			</form>
			<p className={styles.divider}>or</p>
			<Button
				className={`button orange full-width`}
				onClick={goToRegisterPage}
			>
				Register
			</Button>
		</div>
	);
};

export default LoginForm;
