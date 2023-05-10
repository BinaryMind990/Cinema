import { Fragment } from 'react';
import Navigation from './Navigation';

const Header = (props) => {
	return (
		<Fragment>
			<header>
				<h1>Sutjeska</h1>
				<Navigation />
			</header>
		</Fragment>
	);
};
export default Header;
