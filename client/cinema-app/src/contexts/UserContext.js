import { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import CinemaAxios from '../apis/CinemaAxios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);

	const navigate = useNavigate();

	const login = async (username, password) => {
		const credentials = {
			username: username,
			password: password,
		};
		try {
			const res = await CinemaAxios.post(`/users/auth`, credentials);
			const jwtDecoded = jwt_decode(res.data);
			window.localStorage.setItem('jwt', res.data);
			window.localStorage.setItem('role', jwtDecoded.role.authority);
			setUser(jwtDecoded);
			setRole(jwtDecoded.role.authority);
			navigate('/movies');
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
		navigate('/');
	};

	return (
		<UserContext.Provider value={{ user, role, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
