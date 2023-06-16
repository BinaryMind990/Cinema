import Button from 'components/UI/Button/Button';

const AdminChangePasswordForm = ({
	editUserData,
	handleFormChange,
	handleSubmit,
}) => {
	return (
		<form className='form' onSubmit={handleSubmit}>
			<label htmlFor='password'>New password</label>
			<input
				required
				type='password'
				name='password'
				id='password'
				value={editUserData.password}
				minLength={5}
				onChange={handleFormChange}
			/>
			<label htmlFor='confirmPassword'>Confirm password</label>
			<input
				required
				type='password'
				name='confirmPassword'
				id='confirmPassword'
				value={editUserData.confirmPassword}
				onChange={handleFormChange}
			/>
			<Button className={`blue`} type='submit'>
				Change password
			</Button>
		</form>
	);
};

export default AdminChangePasswordForm;
