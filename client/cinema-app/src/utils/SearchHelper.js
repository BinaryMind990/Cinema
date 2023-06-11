export const searchRepertoir = (projections, searchTerm, sortOrder) => {
	const searchValue = searchTerm.toLowerCase();
	const filteredProjections = projections.filter(
		(projection) =>
			projection.ticketPrice.toString().includes(searchValue) ||
			projection.movieName.toLowerCase().includes(searchValue) ||
			projection.typeName.toLowerCase().includes(searchValue)
	);

	filteredProjections.sort((a, b) => {
		if (sortOrder === 'asc') {
			return a.ticketPrice - b.ticketPrice;
		} else if (sortOrder === 'desc') {
			return b.ticketPrice - a.ticketPrice;
		} else {
			return 0;
		}
	});

	return filteredProjections;
};

export const searchUsers = (users, searchTerm) => {
	const searchValue = searchTerm.toLowerCase();
	const filteredUsers = users.filter(
		(user) =>
			user?.username?.toLowerCase().includes(searchValue) ||
			user?.userRole?.toLowerCase().includes(searchValue)
	);

	return filteredUsers;
};
