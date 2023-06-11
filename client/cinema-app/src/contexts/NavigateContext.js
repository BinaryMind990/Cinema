import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavigateContext = createContext();

export const NavigateProvider = ({ children }) => {
	const navigate = useNavigate();

	const toRegisterPage = () => {
		navigate('/account/registration');
	};

	const editUser = (userId) => {
		navigate(`/account/edit/${userId}`);
	};

	const contextValue = {
		editUser,
		toRegisterPage,
	};
	return (
		<NavigateContext.Provider value={contextValue}>
			{children}
		</NavigateContext.Provider>
	);
};
