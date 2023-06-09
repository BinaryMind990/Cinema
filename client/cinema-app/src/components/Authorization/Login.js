import { useContext, useState } from 'react';
import Button from '../UI/Button';
import { UserContext } from '../../contexts/UserContext';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const { login } = useContext(UserContext);

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		login(userName, password);
	};

	const goToRegisterPage = () => {
		navigate('/account/registration');
	};

	<a href='https://pngtree.com/free-backgrounds'>
		free background photos from pngtree.com/
	</a>;

	return (
		<div className={styles['login-form']}>
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
				<p>or</p>
				<Button
					className={`button yellow full-width`}
					onClick={goToRegisterPage}
				>
					Register
				</Button>
			</form>
		</div>
	);
};
export default Login;
