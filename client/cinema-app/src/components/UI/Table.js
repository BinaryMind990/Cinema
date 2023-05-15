import Button from './Button';
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
					{props.items.map((item) => {
						const dateTimeString = item.dateTimeStr;
						const date = new Date(dateTimeString);
						const formattedDateTime = date.toLocaleString('fr-FR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						});
						return (
							<tr key={item.id}>
								<td className={styles.cell}>
									<div className={styles.projectionInfo}>
										<Link
											className={styles.link}
											to={props.url(item.id)}
										>
											{item.movieName}
										</Link>
										<p>{formattedDateTime}</p>
										<p>{item.typeName}</p>
										<p>{item.hall}</p>
										<p>{item.ticketPrice}</p>
										<p>{item.freeSeats}</p>
									</div>
									<div className={styles.actions}>
										<div className={styles.buttonWrapper}>
											{item.freeSeats > 0 && (
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
											<Button
												className='red'
												onClick={() => props.delete(item.id)}
											>
												<FaTrash className={styles.trashIcon} />
											</Button>
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
