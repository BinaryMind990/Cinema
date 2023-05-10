import axios from 'axios';

// const CinemaAxios = axios.create({
// 	baseURL: 'http://localhost:8080',
// });

const CinemaAxios = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});

export default CinemaAxios;
