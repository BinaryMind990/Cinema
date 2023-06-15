import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/UI/Loader/Loader';
import { userClient } from 'apis/CinemaClient/UserClient/UserClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedOut, setIsLoggedOut] = useState(false);

	const navigate = useNavigate();

	const login = async (username, password) => {
		const credentials = {
			username: username,
			password: password,
		};
		try {
			const res = await userClient.login(credentials);
			const jwtDecoded = jwt_decode(res);
			window.localStorage.setItem('jwt', res);
			window.localStorage.setItem('role', jwtDecoded.role.authority);
			setUser(jwtDecoded);
			setRole(jwtDecoded.role.authority);
			navigate('/projections');
		} catch (error) {
			alert('Login unsuccessful. Please try again!');
			console.log(error);
		}
	};

	const logout = () => {
		window.localStorage.removeItem('jwt');
		window.localStorage.removeItem('role');
		setUser(null);
		setRole(null);
		setIsLoggedOut(true);
		navigate('/');
	};

	useEffect(() => {
		const jwt = window.localStorage.getItem('jwt');
		const storedRole = window.localStorage.getItem('role');

		if (jwt && storedRole && !isLoggedOut) {
			const jwtDecoded = jwt_decode(jwt);
			setUser(jwtDecoded);
			setRole(storedRole);
		}
		setLoading(false);
	}, [isLoggedOut]);

	const contextValue = {
		user,
		setUser,
		role,
		login,
		logout,
		loading,
	};

	if (loading) {
		return (
			<div className='loader-container'>
				<Loader />
			</div>
		);
	}

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};
