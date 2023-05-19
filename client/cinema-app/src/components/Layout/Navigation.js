import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../../assets/movieLogo.png';
import { UserContext } from '../../contexts/UserContext';
import Button from '../UI/Button';

const Navigation = () => {
	const { user, role, logout } = useContext(UserContext);

	const handleLogout = () => {
		logout();
	};
	return (
		<Fragment>
			<nav className={styles.navigation}>
				<img src={logo} alt='Movie clap' className={styles.logo} />
				<ul className={styles.navLinks}>
					{!user && (
						<>
							<li>
								<Link to='/' className={styles.link}>
									Home
								</Link>
							</li>
							<li>
								<Link to='/projections' className={styles.link}>
									Projections
								</Link>
							</li>
						</>
					)}
					{user && (
						<Fragment>
							<li>
								<Link to='/' className={styles.link}>
									Home
								</Link>
							</li>
							<li>
								<Link to='/movies' className={styles.link}>
									Movies
								</Link>
							</li>
							<li>
								<Link to='/projections' className={styles.link}>
									Projections
								</Link>
							</li>
							<li>
								<Link to='/tickets' className={styles.link}>
									Tikets
								</Link>
							</li>
							{role === 'ROLE_ADMIN' && (
								<li>
									<Link to='/users' className={styles.link}>
										Users
									</Link>
								</li>
							)}
							<Button
								className='red'
								hidden={!user}
								onClick={handleLogout}
							>
								Logout
							</Button>
						</Fragment>
					)}
				</ul>
			</nav>
		</Fragment>
	);
};
export default Navigation;
