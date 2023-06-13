import { Modal, Button } from 'antd';

const ErrorModal = ({ title, message, onClose }) => {
	return (
		<Modal
			title={title}
			open={true}
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
