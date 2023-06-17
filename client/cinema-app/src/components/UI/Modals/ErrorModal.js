import { Modal, Button } from 'antd';
import './Modal.css';

const ErrorModal = ({ title, message, onClose }) => {
	return (
		<Modal
			title={title}
			open={true}
			centered
			onCancel={onClose}
			footer={[
				<Button key='close' onClick={onClose}>
					Close
				</Button>,
			]}
		>
			<p>{message}</p>
		</Modal>
	);
};

export default ErrorModal;
