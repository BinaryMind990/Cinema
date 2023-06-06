import { toast } from 'react-toastify';
import CinemaAxios from 'apis/CinemaAxios';

export const userClient = {
	register: async (userRegData) => {
		await CinemaAxios.post('/users', userRegData);
		toast.success(
			`User ${userRegData.userName} has been registered successfully!`,
			{
				position: toast.POSITION.TOP_RIGHT,
			}
		);
	},
	get: async () => {
		try {
			const response = await CinemaAxios.get('/users');
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getById: async (id) => {
		await CinemaAxios.get(`/users/${id}`);
		try {
			const response = await CinemaAxios.get(`/users/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	edit: async (id, editUserData) => {
		await CinemaAxios.put(`/users/${id}`, editUserData);
		toast.success(
			`User ${editUserData.userName} has been updated successfully!`,
			{
				position: toast.POSITION.TOP_RIGHT,
			}
		);
	},
	delete: async (userId) => {
		await CinemaAxios.delete(`/users/${userId}`);
		toast.success('User has been deleted successfully!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	},
	login: async (credentials) => {
		try {
			const response = await CinemaAxios.post(`/users/auth`, credentials);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};
