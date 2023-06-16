import CinemaAxios from 'apis/CinemaAxios';
import { toast } from 'react-toastify';

export const movieClient = {
	createMovie: async (formData) => {
		await CinemaAxios.post('/movies', formData);
		toast.success(`${formData.name} was added successfully!`, {
			position: toast.POSITION.TOP_RIGHT,
		});
	},
	editMovie: async (id, formData) => {
		await CinemaAxios.put(`/movies/${id}`, formData);
		toast.success(`${formData.name} was edited successfully!`, {
			position: toast.POSITION.TOP_RIGHT,
		});
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
