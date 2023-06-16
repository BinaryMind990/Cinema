import CinemaAxios from 'apis/CinemaAxios';
import { toast } from 'react-toastify';

export const ticketClient = {
	buyTicket: async (ticketData) => {
		await CinemaAxios.post(`/tickets`, ticketData);
		toast.success('You have successfully purchased a ticket!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	},
};
