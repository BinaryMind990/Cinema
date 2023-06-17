export const navLinks = [
	{
		title: 'Movies',
		to: '/movies',
		public: false,
	},
	{
		title: 'Repertoire',
		to: '/projections',
		public: true,
	},
	{
		title: 'Reports',
		to: '/reports',
		public: false,
	},
	{
		title: 'My Account',
		to: '/account/:id',
		public: true,
	},
	{
		title: 'Users',
		to: '/users',
		public: false,
	},
];

export const guestLinks = [
	{
		title: 'Home',
		to: '/',
	},
	{
		title: 'Repertoire',
		to: '/projections',
	},
];
