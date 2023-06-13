import { useNavigate } from 'react-router-dom';
import { userClient } from 'apis/CinemaClient';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const RegisterUser = () => {
	const navigate = useNavigate();

	const registrationSubmitHandle = async (userRegData) => {
		await userClient.register(userRegData);
		navigate('/');
	};

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Registration</h1>
			</div>
			<div className='page-wrapper'>
				<RegistrationForm onSubmit={registrationSubmitHandle} />
			</div>
		</div>
	);
};
export default RegisterUser;
