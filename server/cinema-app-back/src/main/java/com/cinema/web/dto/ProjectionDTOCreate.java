package com.cinema.web.dto;

import java.util.Objects;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import org.springframework.stereotype.Component;

@Component
public class ProjectionDTOCreate {

	@NotNull
	@Positive
	private Long movieId;

	@NotNull
	@Min(value = 1, message = "Type id must be between 1 and 3")
	@Max(value = 3, message = "Type id must be between 1 and 3")
	private Long typeId;

	@NotNull
	@Min(value = 1, message = "Hall id must be between 1 and 5")
	@Max(value = 5, message = "Hall id must be between 1 and 5")
	private Long hallId;

	@NotBlank(message = "Date and time are not added.")
	@Pattern(regexp = "^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$", message = "Date and time are not valid.")
	private String dateTimeStr;

	@Positive
	private double ticketPrice;

	public ProjectionDTOCreate(Long movieId, Long typeId, Long hallId, String dateTimeStr, double ticketPrice) {
		super();
		this.movieId = movieId;
		this.typeId = typeId;
		this.hallId = hallId;
		this.dateTimeStr = dateTimeStr;
		this.ticketPrice = ticketPrice;
	}

	public ProjectionDTOCreate() {
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
		ProjectionDTOCreate other = (ProjectionDTOCreate) obj;
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
