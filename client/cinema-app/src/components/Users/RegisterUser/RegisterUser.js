import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { userClient } from 'apis/CinemaClient/UserClient/UserClient';
import ErrorModal from 'components/UI/Modals/ErrorModal';

const RegisterUser = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [errorModal, setErrorModal] = useState(false);
	const navigate = useNavigate();

	const registrationSubmitHandle = async (userRegData) => {
		try {
			await userClient.register(userRegData);
			navigate('/');
		} catch (error) {
			console.log('error.response.data:', error.response.data);

			setErrorMessage(error.response.data);
			setErrorModal(true);
			return;
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
