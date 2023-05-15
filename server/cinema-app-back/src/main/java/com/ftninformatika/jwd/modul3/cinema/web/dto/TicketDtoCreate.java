package com.ftninformatika.jwd.modul3.cinema.web.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import org.springframework.stereotype.Component;

@Component
public class TicketDtoCreate {
	
	@NotNull
	@Positive
	private Long projectionId;

	@NotNull
	@Positive
	private Long seatNumber;
	
	public Long getProjectionId() {
		return projectionId;
	}

	public void setProjectionId(Long projectionId) {
		this.projectionId = projectionId;
	}

	public Long getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(Long seatNumber) {
		this.seatNumber = seatNumber;
	}
	
	

}
