import Button from '../../../UI/Button/Button';
import { Link } from 'react-router-dom';
import styles from './Table.module.css';
import ConfirmationModal from 'components/UI/ConfirmationModal/ConfirmationModal';

const Table = (props) => {
	return (
		<div className='table-wrapper'>
			<table>
				<tbody>
					{props.items.map((item) => {
						const movie = props.movies.find(
							(movie) => movie.id === item.movieId
						);
						const dateTimeString = item.dateTimeStr;
						const dateParts = dateTimeString
							? dateTimeString.split('T')[0].split('-')
							: null;
						const formattedDate = dateParts
							? dateParts.reverse().join('.')
							: null;
						const time = dateTimeString
							? dateTimeString.split('T')[1].substring(0, 5)
							: null;
						const formattedDateTime =
							formattedDate && time ? `${formattedDate} ${time}` : null;
						return (
							<tr key={item.id}>
								<td className={styles.cell}>
									<div className={styles['movie-info']}>
										<div className={styles['movie-poster']}>
											<img src={movie?.posterLink} alt='' />
										</div>
										<div className={styles['movie-details']}>
											<h2>
												<Link
													className={styles.link}
													to={props.url(item.movieId)}
												>
													{item.movieName}
												</Link>
											</h2>
											<p>{formattedDateTime}</p>
											<p>{item.typeName}</p>
											<p>{item.hall}</p>
											<p>{`${item.ticketPrice.toFixed(2)} din`}</p>
										</div>
									</div>
									<div className={styles.actions}>
										{item.freeSeats > 0 &&
											props.role !== 'ROLE_ADMIN' && (
												<div className={styles['button-wrapper']}>
													<Button
														className={`orange`}
														onClick={() => props.buy(item.id)}
													>
														Buy ticket
													</Button>
												</div>
											)}
										{item.freeSeats === 0 &&
											props.role !== 'ROLE_ADMIN' && (
												<p className='red-text'>Tickets are sold</p>
											)}
										{props.role === 'ROLE_ADMIN' && (
											<div className={styles['button-sets']}>
												<div className={styles['button-wrapper']}>
													<ConfirmationModal
														title='Delete projection'
														message={`Are you sure you want to delete the projection for movie ${movie.name}?`}
														onConfirm={() =>
															props.delete(item.id)
														}
														onCancel={() => {}}
													/>
												</div>
												<div className={styles['button-wrapper']}>
													<Button
														className={`orange`}
														onClick={() =>
															props.ticketLists(item.id)
														}
													>
														Tickets
													</Button>
												</div>
											</div>
										)}
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default Table;
