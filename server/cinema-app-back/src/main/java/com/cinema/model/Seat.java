package com.cinema.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Seat implements Serializable {

	@Id
	private Long seatNumber;

	@Id
	@ManyToOne
	private Hall hall;

	public Seat(Long seatNumber, Hall hall) {
		super();
		this.seatNumber = seatNumber;
		this.hall = hall;
	}

	public Seat() {
		super();
	}

	@Override
	public int hashCode() {
		return Objects.hash(hall, seatNumber);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Seat other = (Seat) obj;
		return Objects.equals(hall, other.hall) && Objects.equals(seatNumber, other.seatNumber);
	}

	public Long getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(Long seatNumber) {
		this.seatNumber = seatNumber;
	}

	public Hall getHall() {
		return hall;
	}

	public void setHall(Hall hall) {
		this.hall = hall;
	}

	@Override
	public String toString() {
		return "Seat [seatNumber=" + seatNumber + ", hall=" + hall + "]";
	}

}
