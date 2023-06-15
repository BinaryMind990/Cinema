import CinemaAxios from 'apis/CinemaAxios';
import { toast } from 'react-toastify';

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
