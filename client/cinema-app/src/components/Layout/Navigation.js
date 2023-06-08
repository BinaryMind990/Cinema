import { Fragment, useContext } from 'react';
import styles from './Navigation.module.css';
import logo from '../../assets/movieLogo.png';
import { UserContext } from '../../contexts/UserContext';
import Button from '../UI/Button';
import { guestLinks, navLinks } from 'components/Layout/NavLinks';
import { NavItem } from 'components/Layout/NavItem';

const Navigation = () => {
	const { user, role, logout } = useContext(UserContext);
	const userId = user ? user.id : undefined; // Pristupamo ID-u korisnika

	const handleLogout = () => logout();

	const generateUserNavItem = (to, title, userId, styles) => {
		const userUrl = to.replace(':id', userId || '');
		return (
			<NavItem
				key={userUrl}
				url={userUrl}
				title={title}
				styleName={styles}
			/>
		);
	};

	const publicLinks = navLinks.filter((route) => route.public);

	const guestRoutes = guestLinks.map(({ to, title }) => (
		<NavItem key={to} url={to} title={title} styleName={styles.link} />
	));

	const userRoutes = publicLinks.map(({ to, title }) => {
		if (to === '/account/:id') {
			return generateUserNavItem(to, title, userId, styles.link);
		}
		return (
			<NavItem key={to} url={to} title={title} styleName={styles.link} />
		);
	});

	const adminRoutes = navLinks.map(({ to, title }) => {
		if (to === '/account/:id') {
			return generateUserNavItem(to, title, userId, styles.link);
		}
		return (
			<NavItem key={to} url={to} title={title} styleName={styles.link} />
		);
	});

	return (
		<Fragment>
			<nav className={styles.navigation}>
				<img src={logo} alt='Movie clap' className={styles.logo} />
				<ul className={styles.navLinks}>
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
