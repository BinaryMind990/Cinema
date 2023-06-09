import Button from '../../../UI/Button';
import { Link } from 'react-router-dom';
import { FaTrash, FaTicketAlt } from 'react-icons/fa';
import styles from './Table.module.css';

const Table = (props) => {
	return (
		<div>
			<table>
				<tbody>
					{props.movies.map((movie) => {
						const item = props.items.find(
							(item) => item?.movieId === movie.id
						);
						if (!item) return null;
						const dateTimeString = item?.dateTimeStr;
						const date = dateTimeString ? new Date(dateTimeString) : null;
						const formattedDateTime = date?.toLocaleString('fr-FR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						});
						return (
							<tr key={item.id}>
								<td className={styles.cell}>
									<div className={styles['movie-info']}>
										<div className={styles['movie-poster']}>
											<img src={movie.posterLink} alt='' />
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
											props.role === 'ROLE_USER' && (
												<div className={styles['button-wrapper']}>
													<Button
														className={`orange`}
														onClick={() => props.buy(item.id)}
													>
														<FaTicketAlt />
													</Button>
												</div>
											)}
										{props.role === 'ROLE_ADMIN' && (
											<div className={styles['button-sets']}>
												<div className={styles['button-wrapper']}>
													<Button
														className='red'
														onClick={() => props.delete(item.id)}
													>
														<FaTrash />
													</Button>
												</div>
												<div className={styles['button-wrapper']}>
													<Button
														className={`orange`}
														onClick={() =>
															props.ticketLists(item.id)
														}
													>
														<FaTicketAlt />
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
