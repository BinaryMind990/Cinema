import { Fragment, useContext } from 'react';
import './Navigation.css';
import { UserContext } from '../../../contexts/UserContext';
import Button from '../../UI/Button/Button';
import { guestLinks, navLinks } from '../Navigation/NavLinks';
import { NavItem } from '../Navigation/NavItem';

const Navigation = () => {
	const { user, role, logout } = useContext(UserContext);
	const userId = user ? user.id : undefined;

	const handleLogout = () => logout();

	const generateUserNavItem = (to, title, userId) => {
		const userUrl = to.replace(':id', userId || '');
		return (
			<NavItem
				key={userUrl}
				url={userUrl}
				title={title}
				styleName={'link menu-link'}
			/>
		);
	};

	const publicLinks = navLinks.filter((route) => route.public);

	const guestRoutes = guestLinks.map(({ to, title }) => (
		<NavItem key={to} url={to} title={title} styleName={'link menu-link'} />
	));

	const userRoutes = publicLinks.map(({ to, title }) => {
		if (to === '/account/:id') {
			return generateUserNavItem(to, title, userId);
		}
		return (
			<NavItem
				key={to}
				url={to}
				title={title}
				styleName={'link menu-link'}
			/>
		);
	});

	const adminRoutes = navLinks.map(({ to, title }) => {
		if (to === '/account/:id') {
			return generateUserNavItem(to, title, userId);
		}
		return (
			<NavItem
				key={to}
				url={to}
				title={title}
				styleName={'link menu-link'}
			/>
		);
	});

	return (
		<Fragment>
			<nav className={'navigation'}>
				<img
					src='../../../assets/movieLogo.png'
					alt='Movie clap'
					className={'logo'}
				/>
				<ul className={'navLinks'}>
					{!user && guestRoutes}
					{user && (role === 'ROLE_ADMIN' ? adminRoutes : userRoutes)}
					{user && (
						<Button className='red' hidden={!user} onClick={handleLogout}>
							Logout
						</Button>
					)}
				</ul>
			</nav>
		</Fragment>
	);
};

export default Navigation;
