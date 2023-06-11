import Button from 'components/UI/Button';
import styles from '../EditUser.module.css';

const ChangeRoleForm = ({ editUserData, handleFormChange, handleSubmit }) => {
	return (
		<form className='form' onSubmit={handleSubmit}>
			<div className={styles['change-role']}>
				<label>Role</label>
				<label>
					<input
						className='radio-button'
						type='radio'
						name='role'
						value='USER'
						checked={editUserData.role === 'USER'}
						onChange={handleFormChange}
					/>
					User
				</label>
				<label>
					<input
						className='radio-button'
						type='radio'
						name='role'
						value='ADMIN'
						checked={editUserData.role === 'ADMIN'}
						onChange={handleFormChange}
					/>
					Admin
				</label>
			</div>
			<Button className={`blue`} type='submit'>
				Change role
			</Button>
		</form>
	);
};

export default ChangeRoleForm;
