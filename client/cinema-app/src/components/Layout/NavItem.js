import { Link } from 'react-router-dom';

export const NavItem = ({ url, title, styleName }) => {
	return (
		<li>
			<Link to={url} className={styleName}>
				{title}
			</Link>
		</li>
	);
};
