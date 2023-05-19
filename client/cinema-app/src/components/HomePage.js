import { Link } from 'react-router-dom';
import Login from './Authorization/Login';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const HomePage = () => {
	const { user } = useContext(UserContext);
	return (
		<div>
			<h1>Welcome to Cinema Sutjeska</h1>
			{!user && (
				<>
					<Link className='link' to={'/users/registration'}>
						Register
					</Link>
					<Login />
				</>
			)}
		</div>
	);
};
export default HomePage;
