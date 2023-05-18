import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			<h1>Welcome to Cinema Sutjeska</h1>
			<Link className='link' to={'/users/registration'}>
				Register
			</Link>
		</div>
	);
};
export default HomePage;
