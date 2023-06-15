import CinemaAxios from 'apis/CinemaAxios';

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
