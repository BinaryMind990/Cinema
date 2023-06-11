import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { NavigateContext } from 'contexts/NavigateContext';
import LoginForm from './LoginForm/LoginForm';

const Login = () => {
	const { login } = useContext(UserContext);
	const { toRegisterPage } = useContext(NavigateContext);

	const handleLogin = (userName, password) => {
		login(userName, password);
	};

	return (
		<div>
			<LoginForm
				handleLogin={handleLogin}
				goToRegisterPage={toRegisterPage}
			/>
		</div>
	);
};
export default Login;
