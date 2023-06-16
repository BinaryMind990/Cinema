export const mapKeyToDisplayReport = (key) => {
	switch (key) {
		case 'name':
			return 'Title';
		case 'numberOfProjections':
			return 'Number of Projections';
		case 'sum':
			return 'Sum';
		case 'soldTicketsForMovie':
			return 'Number of sold tickets';
		default:
			return key;
	}
};
