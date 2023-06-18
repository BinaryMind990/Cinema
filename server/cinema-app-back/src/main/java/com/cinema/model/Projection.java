package com.cinema.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Projection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Movie movie;

	@ManyToOne
	private Type type;

	@ManyToOne
	private Hall hall;

	@Column(nullable = false)
	private LocalDateTime dateAndTime;

	@Column
	private double ticketPrice;
	
	@Column
	private Boolean deleted = false;

	@OneToMany(mappedBy = "projection", cascade = CascadeType.ALL)
	private List<Ticket> tickets = new ArrayList<Ticket>();

	public Projection(Long id, Movie movie, Type type, Hall hall, LocalDateTime dateAndTime, double ticketPrice) {
		super();
		this.id = id;
		this.movie = movie;
		this.type = type;
		this.hall = hall;
		this.dateAndTime = dateAndTime;
		this.ticketPrice = ticketPrice;
	}

	public Projection(Movie movie, Type type, Hall hall, LocalDateTime dateAndTime, double ticketPrice) {
		super();
		this.movie = movie;
		this.type = type;
		this.hall = hall;
		this.dateAndTime = dateAndTime;
		this.ticketPrice = ticketPrice;
	}

	public Projection() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Hall getHall() {
		return hall;
	}

	public void setHall(Hall hall) {
		this.hall = hall;
	}

	public LocalDateTime getDateAndTime() {
		return dateAndTime;
	}

	public void setDateAndTime(LocalDateTime dateAndTime) {
		this.dateAndTime = dateAndTime;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public double getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(double ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	public int freeSeats() {
		return this.hall.getSeats().size() - this.tickets.size();
	}
	
	public double earningFromProjection() {
		return this.tickets.size()*ticketPrice;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dateAndTime, hall, id, movie, ticketPrice, type);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Projection other = (Projection) obj;
		return Objects.equals(dateAndTime, other.dateAndTime) && Objects.equals(hall, other.hall)
				&& Objects.equals(id, other.id) && Objects.equals(movie, other.movie)
				&& Double.doubleToLongBits(ticketPrice) == Double.doubleToLongBits(other.ticketPrice)
				&& Objects.equals(type, other.type);
	}

	@Override
	public String toString() {
		return "Projection [id=" + id + ", movie=" + movie.getName() + ", type=" + type.getName() + ", hall="
				+ hall.getName() + ", dateAndTime="
				+ dateAndTime + ", ticketPrice=" + ticketPrice + "]";
	}

}
