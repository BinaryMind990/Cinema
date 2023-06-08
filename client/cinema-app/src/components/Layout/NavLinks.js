export const navLinks = [
	{
		title: 'Home',
		to: '/',
		public: true,
	},
	{
		title: 'Movies',
		to: '/movies',
		public: true,
	},
	{
		title: 'Repertoar',
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
		title: 'Projections',
		to: '/projections',
	},
];
