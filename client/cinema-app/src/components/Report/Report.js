import CinemaAxios from 'apis/CinemaAxios';
import Button from 'components/UI/Button';
import { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';

const Report = () => {
	const [reports, setReports] = useState([]);
	const [searchQuery, setSearchQuery] = useState({ dateFrom: '', dateTo: '' });

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getReports = async () => {
			try {
				let res;
				if (searchQuery.dateFrom && searchQuery.dateTo) {
					res = await CinemaAxios.get(`/report/1`, {
						params: {
							dateFrom: searchQuery.dateFrom,
							dateTo: searchQuery.dateTo,
						},
					});
				} else {
					res = await CinemaAxios.get(`/report/1`);
				}
				setReports(res.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getReports();
	}, [searchQuery]);

	const handleReset = () => {
		setSearchQuery({ dateFrom: '', dateTo: '' });
	};

	const mapKeyToDisplay = (key) => {
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

	if (loading) {
		return (
			<div className='loader-container'>
				<CircleLoader size={75} />
			</div>
		);
	}

	return (
		<div>
			<h1>Report</h1>
			<div>
				<label htmlFor='dateFrom'>
					Date from
					<input
						type='date'
						name='dateFrom'
						id='dateFrom'
						value={searchQuery.dateFrom}
						onChange={(e) =>
							setSearchQuery({
								...searchQuery,
								dateFrom: e.target.value,
							})
						}
					/>
				</label>
				<label htmlFor='dateTo'>
					Date to
					<input
						type='date'
						name='dateTo'
						id='dateTo'
						value={searchQuery.dateTo}
						onChange={(e) =>
							setSearchQuery({
								...searchQuery,
								dateTo: e.target.value,
							})
						}
					/>
				</label>
				<Button className={`blue`} onClick={handleReset}>
					Reset
				</Button>
			</div>

			<div>
				{reports.map((report) => (
					<div key={report.id}>
						{Object.entries(report).map(
							([key, value]) =>
								key !== 'movieId' && (
									<p key={report.id}>
										<span>{mapKeyToDisplay(key)}: </span>
										<span>{value}</span>
									</p>
								)
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Report;
