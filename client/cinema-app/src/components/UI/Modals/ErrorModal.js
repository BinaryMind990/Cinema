import { Modal, Button } from 'antd';

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
			<h3>{message}</h3>
		</Modal>
	);
};

export default ErrorModal;
