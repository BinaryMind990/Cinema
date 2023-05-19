import { useContext, useState } from 'react';
import Button from '../UI/Button';
import { UserContext } from '../../contexts/UserContext';
import styles from './Login.module.css';

const Login = () => {
	const { login } = useContext(UserContext);

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		login(userName, password);
	};

	return (
		<div className={styles['login-form']}>
			<h1>Login</h1>
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
				<Button type='submit' className={`button blue`}>
					Log in
				</Button>
			</form>
		</div>
	);
};
export default Login;
