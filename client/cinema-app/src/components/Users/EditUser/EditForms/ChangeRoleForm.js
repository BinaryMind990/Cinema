import Button from 'components/UI/Button';

const ChangeRoleForm = ({ editUserData, handleFormChange, handleSubmit }) => {
	return (
		<form className='form' onSubmit={handleSubmit}>
			<div>
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
