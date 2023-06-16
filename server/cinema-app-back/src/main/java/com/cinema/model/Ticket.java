package com.cinema.model;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Projection projection;

	@ManyToOne
	@PrimaryKeyJoinColumn
	private Seat seat;

	@Column
	private LocalDateTime dateAndTime;

	@ManyToOne
	private Users user;

	public Ticket(Long id, Projection projection, Seat seat) {
		super();
		this.id = id;
		this.projection = projection;
		this.seat = seat;
	}

	public Ticket() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Projection getProjection() {
		return projection;
	}

	public void setProjection(Projection projection) {
		this.projection = projection;
	}

	public Seat getSeat() {
		return seat;
	}

	public void setSeat(Seat seat) {
		this.seat = seat;
	}

	public LocalDateTime getDateAndTime() {
		return dateAndTime;
	}

	public void setDateAndTime(LocalDateTime dateAndTime) {
		this.dateAndTime = dateAndTime;
	}

	

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, projection, seat);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ticket other = (Ticket) obj;
		return Objects.equals(id, other.id) && Objects.equals(projection, other.projection)
				&& Objects.equals(seat, other.seat);
	}

	@Override
	public String toString() {
		return "Ticket [id=" + id + ", projection=" + projection.getId() + ", seat=" + seat.getSeatNumber() + " hall "
				+ seat.getHall().getName() + "]";
	}

}