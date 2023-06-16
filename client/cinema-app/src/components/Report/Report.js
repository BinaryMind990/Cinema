import { useEffect, useState } from 'react';
import CinemaAxios from 'apis/CinemaAxios';
import styles from './Reports.module.css';
import Button from 'components/UI/Button/Button';

import Loader from 'components/UI/Loader/Loader';
import { mapKeyToDisplayReport } from 'utils/MapKey/MapKeyHelperReport';

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

	if (loading) {
		return (
			<div className='loader-container'>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<div className='title-wrapper'>
				<h1>Report</h1>
			</div>
			<div className='page-wrapper'>
				<div className={styles['date-picker']}>
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
					<Button className={`red`} onClick={handleReset}>
						Reset
					</Button>
				</div>
				<div className='table-wrapper'>
					{reports.length > 0 ? (
						<table className={styles['reports-table']}>
							<thead>
								<tr>
									{Object.keys(reports[0]).map(
										(key) =>
											key !== 'movieId' && (
												<th key={key}>
													{mapKeyToDisplayReport(key)}
												</th>
											)
									)}
								</tr>
							</thead>
							<tbody>
								{reports.map((report) => (
									<tr key={report.movieId}>
										{Object.entries(report).map(
											([key, value]) =>
												key !== 'movieId' && (
													<td key={key}>{value}</td>
												)
										)}
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>There are no available reports.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Report;
