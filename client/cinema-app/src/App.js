import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Layout/Header';
import { AppRoutes } from './routes';

function App() {
	return (
		<Router>
			<UserProvider>
				<Header />
				<main>
					<AppRoutes />
				</main>
			</UserProvider>
		</Router>
	);
}

export default App;
