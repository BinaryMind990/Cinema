package com.cinema.web.dto;

import java.util.Objects;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class ProjectionDTO {

	private Long id;

	private String movieName;

	private Long movieId;

	private String typeName;

	private Long typeId;

	private String hall;

	private Long hallId;

	private String dateTimeStr;

	private double ticketPrice;

	private int freeSeats;

	private Set<Long> seats;

	public ProjectionDTO(Long id, String movieName, Long movieId, String typeName, Long typeId, String hall,
			Long hallId, String dateTimeStr, double ticketPrice) {
		super();
		this.id = id;
		this.movieName = movieName;
		this.movieId = movieId;
		this.typeName = typeName;
		this.typeId = typeId;
		this.hall = hall;
		this.hallId = hallId;
		this.dateTimeStr = dateTimeStr;
		this.ticketPrice = ticketPrice;

	}

	public ProjectionDTO(String movieName, Long movieId, String typeName, Long typeId, String hall, Long hallId,
			String dateTimeStr, double ticketPrice) {
		super();
		this.movieName = movieName;
		this.movieId = movieId;
		this.typeName = typeName;
		this.typeId = typeId;
		this.hall = hall;
		this.hallId = hallId;
		this.dateTimeStr = dateTimeStr;
		this.ticketPrice = ticketPrice;

	}

	public ProjectionDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public String getHall() {
		return hall;
	}

	public void setHall(String hall) {
		this.hall = hall;
	}

	public Long getHallId() {
		return hallId;
	}

	public void setHallId(Long hallId) {
		this.hallId = hallId;
	}

	public String getDateTimeStr() {
		return dateTimeStr;
	}

	public void setDateTimeStr(String dateTimeStr) {
		this.dateTimeStr = dateTimeStr;
	}

	public double getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(double ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public int getFreeSeats() {
		return freeSeats;
	}

	public void setFreeSeats(int freeSeats) {
		this.freeSeats = freeSeats;
	}

	public Set<Long> getSeats() {
		return seats;
	}

	public void setSeats(Set<Long> seats) {
		this.seats = seats;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dateTimeStr, hall, hallId, id, movieId, movieName, ticketPrice, typeId, typeName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProjectionDTO other = (ProjectionDTO) obj;
		return Objects.equals(dateTimeStr, other.dateTimeStr) && Objects.equals(hall, other.hall)
				&& Objects.equals(hallId, other.hallId) && Objects.equals(id, other.id)
				&& Objects.equals(movieId, other.movieId) && Objects.equals(movieName, other.movieName)
				&& Double.doubleToLongBits(ticketPrice) == Double.doubleToLongBits(other.ticketPrice)
				&& Objects.equals(typeId, other.typeId) && Objects.equals(typeName, other.typeName);
	}

	@Override
	public String toString() {
		return "ProjectionDTO [id=" + id + ", movieName=" + movieName + ", movieId=" + movieId + ", typeName="
				+ typeName + ", typeId=" + typeId + ", hall=" + hall + ", hallId=" + hallId + ", dateTimeStr="
				+ dateTimeStr + ", ticketPrice=" + ticketPrice + " ]";
	}

}
