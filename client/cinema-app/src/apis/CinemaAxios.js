import axios from 'axios';

const baseURL =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_BACKEND_URL_LIVE
		: process.env.REACT_APP_BACKEND_URL_LOCAL;

const CinemaAxios = axios.create({
	baseURL: baseURL,
});

CinemaAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('jwt');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default CinemaAxios;
