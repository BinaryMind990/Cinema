import Button from '../../../UI/Button';
import { Link } from 'react-router-dom';
import { FaTrash, FaTicketAlt } from 'react-icons/fa';
import styles from './Table.module.css';

const Table = (props) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>{props.title}</th>
					</tr>
				</thead>
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
											<Link
												className={styles.link}
												to={props.url(item.movieId)}
											>
												{item.movieName}
											</Link>
											<p>{formattedDateTime}</p>
											<p>{item.typeName}</p>
											<p>{item.hall}</p>
											<p>{item.ticketPrice}</p>
										</div>
									</div>
									<div className={styles.actions}>
										<div className={styles.buttonWrapper}>
											{item.freeSeats > 0 &&
												props.role === 'ROLE_USER' && (
													<Link
														className={`${styles.link} ${styles.buy}`}
														to={props.buy(item.id)}
													>
														<FaTicketAlt
															className={`${styles.trashIcon} orange`}
														/>
													</Link>
												)}
										</div>
										<div className={styles.buttonWrapper}>
											{props.role === 'ROLE_ADMIN' && (
												<>
													<Button
														className='red'
														onClick={() => props.delete(item.id)}
													>
														<FaTrash
															className={styles.trashIcon}
														/>
													</Button>
													<Button
														className={`${styles.link} ${styles.buy}`}
														onClick={() =>
															props.ticketLists(item.id)
														}
													>
														<FaTicketAlt
															className={`${styles.trashIcon} orange`}
														/>
													</Button>
												</>
											)}
										</div>
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
