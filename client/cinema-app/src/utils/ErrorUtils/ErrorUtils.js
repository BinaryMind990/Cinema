export const formatErrorMessage = (errorMessage) => {
	if (!errorMessage) {
		return 'Unknown error occurred';
	}

	const formattedMessage =
		errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

	return formattedMessage;
};
