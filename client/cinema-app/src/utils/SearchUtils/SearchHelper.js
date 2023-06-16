export const searchRepertoir = (projections, searchTerm, sortOrder) => {
	const searchValue = searchTerm.toLowerCase();

	const filteredProjections = projections.filter((projection) =>
		containsSearchTerm(projection, searchValue)
	);

	let sortedProjections = [...filteredProjections];

	if (sortOrder === 'asc') {
		sortedProjections.sort((a, b) => a.ticketPrice - b.ticketPrice);
	} else if (sortOrder === 'desc') {
		sortedProjections.sort((a, b) => b.ticketPrice - a.ticketPrice);
	}

	return sortedProjections;
};

const containsSearchTerm = (projection, searchValue) => {
	const matchMovieName = projection.movieName
		.toLowerCase()
		.includes(searchValue);
	const matchTypeName = projection.typeName
		.toLowerCase()
		.includes(searchValue);

	return matchMovieName || matchTypeName;
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
