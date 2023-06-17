import { useNavigate } from 'react-router-dom';
import Button from './UI/Button/Button';

const NotFound = () => {
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate('/projections');
	};

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Oops page not found</h1>
			</div>
			<div className='page-wrapper'>
				<div className='not-found-wrapper'>
					<p className='not-found-code yellow-text'>404</p>
					<p className='not-found-text'>
						The page you are looking for might be removed or temporarily
						unavailable
					</p>
					<div>
						<Button className='yellow' onClick={navigateHandler}>
							Back
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default NotFound;
