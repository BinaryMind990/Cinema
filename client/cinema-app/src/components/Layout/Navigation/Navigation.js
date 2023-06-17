import { useContext, useState } from 'react';
import './Navigation.css';
import { UserContext } from '../../../contexts/UserContext';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { guestLinks, navLinks } from '../Navigation/NavLinks';
import { Link } from 'react-router-dom';

const Navigation = () => {
	const { user, role, logout } = useContext(UserContext);
	const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

	const userId = user ? user.id : undefined;

	const handleLogout = () => logout();

	const toggleBurgerMenu = () => {
		setBurgerMenuOpen(!isBurgerMenuOpen);
	};

	const generateUserNavItem = (to, title, userId) => {
		const userUrl = to.replace(':id', userId || '');
		return (
			<Menu.Item key={userUrl} className='link menu-link'>
				<Link to={userUrl}>{title}</Link>
			</Menu.Item>
		);
	};

	const publicLinks = navLinks.filter((route) => route.public);

	const guestRoutes = guestLinks.map(({ to, title }) => (
		<Menu.Item key={to} className='link menu-link'>
			<Link to={to}>{title}</Link>
		</Menu.Item>
	));

	const userRoutes = publicLinks.map(({ to, title }) => {
		if (to === '/account/:id') {
			return generateUserNavItem(to, title, userId);
		}
		return (
			<Menu.Item key={to} className='link menu-link'>
				<Link to={to}>{title}</Link>
			</Menu.Item>
		);
	});

	const adminRoutes = navLinks.map(({ to, title }) => {
		if (to === '/account/:id') {
			return generateUserNavItem(to, title, userId);
		}
		return (
			<Menu.Item key={to} className='link menu-link'>
				<Link to={to}>{title}</Link>
			</Menu.Item>
		);
	});

	return (
		<div>
			<nav className={'navigation'}>
				<div>
					<img
						src='../../../assets/movieLogo.png'
						alt='Movie clap'
						className={'logo'}
					/>
				</div>
				<div className='yellow-text'>
					<h1>Cinema El Capitano</h1>
				</div>
				<div>
					<Button
						type='primary'
						onClick={toggleBurgerMenu}
						className='burger-icon'
					>
						<MenuOutlined className='menu-outlined' />
					</Button>
				</div>
			</nav>
			<Drawer
				placement='right'
				closable={false}
				onClose={toggleBurgerMenu}
				open={isBurgerMenuOpen}
			>
				<div className='drawer-content'>
					<div className='drawer-title'>
						<h2 className='yellow-text'>Cinema El Capitano</h2>
						<div className='close-btn'>
							<CloseOutlined onClick={toggleBurgerMenu} />
						</div>
					</div>
					<Menu onClick={toggleBurgerMenu}>
						{!user && guestRoutes}
						{user && (role === 'ROLE_ADMIN' ? adminRoutes : userRoutes)}
						{user && (
							<Menu.Item key='logout' className='link menu-link'>
								<Button
									className='red'
									hidden={!user}
									onClick={handleLogout}
								>
									Logout
								</Button>
							</Menu.Item>
						)}
					</Menu>
				</div>
			</Drawer>
		</div>
	);
};

export default Navigation;
