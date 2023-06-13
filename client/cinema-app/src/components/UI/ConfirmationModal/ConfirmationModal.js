import { useState } from 'react';
// import Button from '../Button/Button';
import { FaTrash } from 'react-icons/fa';
import { Modal, Button } from 'antd';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleConfirm = () => {
		onConfirm();
		setModalOpen(false);
	};

	const handleCancel = () => {
		onCancel();
		setModalOpen(false);
	};

	return (
		<>
			<Button
				type='primary'
				className='red'
				onClick={() => setModalOpen(true)}
			>
				<FaTrash />
			</Button>
			<Modal
				title={title}
				centered
				open={modalOpen}
				onCancel={handleCancel}
				footer={[
					<Button key='cancel' onClick={handleCancel}>
						Cancel
					</Button>,
					<Button
						key='confirm'
						type='primary'
						danger
						onClick={handleConfirm}
					>
						Confirm
					</Button>,
				]}
			>
				<p>{message}</p>
			</Modal>
		</>
	);
};
export default ConfirmationModal;
