import Button from 'components/UI/Button';

const EditUserForm = ({ editUserData, handleFormChange, handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='username'>Username</label>
			<p>{editUserData.userName}</p>
			<label htmlFor='name'>Name</label>
			<input
				type='text'
				name='name'
				id='name'
				value={editUserData.name}
				onChange={handleFormChange}
			/>
			<label htmlFor='lastName'>Last name</label>
			<input
				type='text'
				name='lastName'
				id='lastName'
				value={editUserData.lastName}
				onChange={handleFormChange}
			/>
			<label htmlFor='eMail'>Last name</label>
			<input
				type='email'
				name='eMail'
				id='eMail'
				value={editUserData.eMail}
				onChange={handleFormChange}
			/>
			<Button className={`blue`} type='submit'>
				Save Changes
			</Button>
		</form>
	);
};

export default EditUserForm;
