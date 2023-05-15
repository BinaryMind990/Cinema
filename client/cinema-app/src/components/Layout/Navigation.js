import { Fragment } from 'react';

import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../../assets/movieLogo.png';

const Navigation = () => {
	return (
		<Fragment>
			<nav className={styles.navigation}>
				<img src={logo} alt='Movie clap' className={styles.logo} />
				<ul className={styles.navLinks}>
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
				</ul>
			</nav>
		</Fragment>
	);
};
export default Navigation;
