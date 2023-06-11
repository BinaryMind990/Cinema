export const mapKeyToDisplay = (key) => {
	switch (key) {
		case 'ticketSellDate':
			return 'Ticket sell date';
		case 'ticketSellTime':
			return 'Ticket sell time';
		case 'userName':
			return 'Username';
		case 'name':
			return 'Name';
		case 'lastName':
			return 'Last name';
		case 'role':
			return 'Role';
		case 'seat':
			return 'Seat';
		case 'projectionDate':
			return 'Projection Date';
		case 'projectionTime':
			return 'Projection Time';
		case 'movieName':
			return 'Movie Title';
		case 'type':
			return 'Type';
		case 'hall':
			return 'Hall';
		case 'price':
			return ' Price';
		case 'ticketBuyDate':
			return 'Ticket Buy Date';
		case 'ticketBuyTime':
			return ' Ticket Buy Time';
		default:
			return key;
	}
};

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
