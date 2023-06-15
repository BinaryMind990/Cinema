import CinemaAxios from 'apis/CinemaAxios';
import { toast } from 'react-toastify';

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
		try {
			const response = await CinemaAxios.get(`/users/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	edit: async (id, editUserData) => {
		try {
			await CinemaAxios.put(`/users/${id}`, editUserData);
			toast.success(
				`User ${editUserData.userName} has been updated successfully!`,
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			);
		} catch (error) {
			toast.error('Failed to update user. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	},
	editRole: async (id, editUserData) => {
		try {
			await CinemaAxios.put(`/users/changeRole/${id}/${editUserData.role}`);
			toast.success('User role changed successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to change user role. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	},
	editPassword: async (id, editUserData) => {
		try {
			await CinemaAxios.put(`/users/changePassword/${id}`, editUserData);
			toast.success('User password changed successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to change user password. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	},
	adminEditPassword: async (id, editUserData) => {
		try {
			await CinemaAxios.put(
				`/users/adminChangePassword/${id}`,
				editUserData
			);
			toast.success('User password changed successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to change user password. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	},
	delete: async (userId) => {
		try {
			await CinemaAxios.delete(`/users/${userId}`);
			toast.success('User has been deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to delete user. Please try again.', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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
