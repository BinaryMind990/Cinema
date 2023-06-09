import { NavLink } from 'react-router-dom';

export const NavItem = ({ url, title, styleName }) => {
	return (
		<li>
			<NavLink to={url} className={styleName}>
				{title}
			</NavLink>
		</li>
	);
};
