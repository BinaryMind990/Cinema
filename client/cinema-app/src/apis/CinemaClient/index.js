import CinemaAxios from '../../apis/CinemaAxios';
import { toast } from 'react-toastify';

export const userClient = {
	register: async (userRegData) => {
		try {
			await CinemaAxios.post('/users', userRegData);
			toast.success(
				`User ${userRegData.userName} has been registered successfully!`,
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			);
		} catch (error) {
			toast.error('Failed to register user. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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

export const dataClient = {
	getMovies: async () => {
		try {
			const response = await CinemaAxios.get('/movies');
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getMoviesById: async (id) => {
		try {
			const response = await CinemaAxios.get(`/movies/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getProjectionById: async (id) => {
		try {
			const response = await CinemaAxios.get(`/projections/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getTicketList: async (id) => {
		try {
			const response = await CinemaAxios.get(`/tickets/projection/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getTypes: async () => {
		try {
			const response = await CinemaAxios.get('/types');
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getHalls: async () => {
		try {
			const response = await CinemaAxios.get('/halls');
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export const movieClient = {
	createMovie: async (formData) => {
		try {
			await CinemaAxios.post('/movies', formData);
			toast.success(`${formData.name} was added successfully!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to add the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			throw error;
		}
	},
	editMovie: async (id, formData) => {
		try {
			await CinemaAxios.put(`/movies/${id}`, formData);
			toast.success(`${formData.name} was edited successfully!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to update the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			throw error;
		}
	},
	deleteMovie: async (movieId) => {
		try {
			await CinemaAxios.delete(`/movies/${movieId}`);
			toast.success('Movie was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to delete the movie. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			throw error;
		}
	},
};

export const projectionClient = {
	createProjection: async (projectionData) => {
		try {
			await CinemaAxios.post('/projections', projectionData);
			toast.success('Projection was added successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to add projection. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			throw error;
		}
	},
	deleteProjection: async (projectionId) => {
		try {
			await CinemaAxios.delete(`/projections/${projectionId}`);
			toast.success('Projection was deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error(`Failed to delete the projection. Please try again!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
			throw error;
		}
	},
};

export const ticketClient = {
	buyTicket: async (ticketData) => {
		try {
			await CinemaAxios.post(`/tickets`, ticketData);
			toast.success('You have successfully purchased a ticket!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		} catch (error) {
			toast.error('Failed to purchase ticket. Please try again!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	},
};
