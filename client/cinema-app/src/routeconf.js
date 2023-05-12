import { useNavigate } from 'react-router-dom';

export function withNavigation(Component) {
	return (props) => <Component {...props} navigate={useNavigate()} />;
}
