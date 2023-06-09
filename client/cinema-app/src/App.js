import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Layout/Header';
import { AppRoutes } from './routes';
import { DataProvider } from 'contexts/GetDataContext';

function App() {
	return (
		<Router>
			<DataProvider>
				<UserProvider>
					<Header />
					<main>
						<AppRoutes />
					</main>
				</UserProvider>
			</DataProvider>
		</Router>
	);
}

export default App;
