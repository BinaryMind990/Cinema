import Button from 'components/UI/Button/Button';

const ChangePasswordForm = ({
	editUserData,
	handleFormChange,
	handleSubmit,
}) => {
	return (
		<form className='form' onSubmit={handleSubmit}>
			<label htmlFor='oldPassword'>Old password</label>
			<input
				type='password'
				name='oldPassword'
				id='oldPassword'
				value={editUserData.oldPassword}
				onChange={handleFormChange}
			/>
			<label htmlFor='password'>New password</label>
			<input
				type='password'
				name='password'
				id='password'
				value={editUserData.password}
				onChange={handleFormChange}
			/>
			<label htmlFor='confirmPassword'>Confirm password</label>
			<input
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

export default ChangePasswordForm;
