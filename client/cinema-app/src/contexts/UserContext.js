import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userClient } from 'apis/CinemaClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
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
		setIsLoggedOut(true);
		navigate('/');
	};

	const fetchUsers = async () => {
		try {
			const res = await userClient.get();
			setUsers(res);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	const getUserUrl = (userId) => {
		return `/users/${userId}`;
	};

	const fetchUserById = async (id) => {
		try {
			const res = await userClient.getById(id);
			setUser(res);
			setLoading(false);
		} catch (error) {
			setUser(null);
			setLoading(false);
		}
	};
	const editUserSubmitHandle = async (id, editUserData) => {
		try {
			await userClient.edit(id, editUserData);
			await fetchUsers();
			navigate('/users');
		} catch (error) {
			toast.error('Failed to update user. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const deleteUser = async (userId) => {
		try {
			await userClient.delete(userId);
			setUsers(users.filter((user) => user.id !== userId));
		} catch (error) {
			toast.error('Failed to delete user. Please try again.', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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
		role,
		users,
		loading,
		login,
		logout,
		deleteUser,
		fetchUserById,
		getUserUrl,
		editUserSubmitHandle,
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};
