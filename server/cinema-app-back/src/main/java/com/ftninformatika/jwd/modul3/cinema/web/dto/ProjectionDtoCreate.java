package com.ftninformatika.jwd.modul3.cinema.web.dto;

import java.util.Objects;
import org.springframework.stereotype.Component;

@Component
public class ProjectionDtoCreate {
	
	private Long movieId;
	
	private Long typeId;
	
	private Long hallId;
	
	private String dateTimeStr;
	
	private double ticketPrice;

	public ProjectionDtoCreate(Long movieId, Long typeId, Long hallId, String dateTimeStr, double ticketPrice) {
		super();
		this.movieId = movieId;
		this.typeId = typeId;
		this.hallId = hallId;
		this.dateTimeStr = dateTimeStr;
		this.ticketPrice = ticketPrice;
	}

	public ProjectionDtoCreate() {
		super();
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
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

	@Override
	public int hashCode() {
		return Objects.hash(dateTimeStr, hallId, movieId, ticketPrice, typeId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProjectionDtoCreate other = (ProjectionDtoCreate) obj;
		return Objects.equals(dateTimeStr, other.dateTimeStr) && Objects.equals(hallId, other.hallId)
				&& Objects.equals(movieId, other.movieId)
				&& Double.doubleToLongBits(ticketPrice) == Double.doubleToLongBits(other.ticketPrice)
				&& Objects.equals(typeId, other.typeId);
	}

	@Override
	public String toString() {
		return "ProjectionDtoCreate [movieId=" + movieId + ", typeId=" + typeId + ", hallId=" + hallId
				+ ", dateTimeStr=" + dateTimeStr + ", ticketPrice=" + ticketPrice + "]";
	}
	
	

}
