import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Layout/Header/Header';
import { AppRoutes } from './routes';

import { NavigateProvider } from 'contexts/NavigateContext';
import { DataProvider } from 'contexts/MainContext';

function App() {
	return (
		<Router>
			<DataProvider>
				<UserProvider>
					<NavigateProvider>
						<Header />
						<main>
							<a
								className='credits'
								href='https://pngtree.com/free-backgrounds'
							>
								free background photos from pngtree.com/
							</a>
							<AppRoutes />
						</main>
					</NavigateProvider>
				</UserProvider>
			</DataProvider>
		</Router>
	);
}

export default App;
