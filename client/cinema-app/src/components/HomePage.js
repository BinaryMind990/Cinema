import Login from './Authorization/Login';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const HomePage = () => {
	const { user } = useContext(UserContext);
	return (
		<div>
			<div className='title-wrapper'>
				<h1>Welcome to Cinema Sutjeska</h1>
			</div>
			{!user && (
				<div className='page-wrapper'>
					<Login />
				</div>
			)}
		</div>
	);
};
export default HomePage;
