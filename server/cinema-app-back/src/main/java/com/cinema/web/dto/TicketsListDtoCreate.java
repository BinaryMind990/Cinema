package com.cinema.web.dto;

import java.util.ArrayList;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.springframework.stereotype.Component;

@Component
public class TicketsListDtoCreate {
	
	@NotNull
	@Positive
	private Long projectionId;
	
	@NotNull
	@NotEmpty
	private ArrayList<Long> seatNumbers;
	
	
	

	public Long getProjectionId() {
		return projectionId;
	}

	public void setProjectionId(Long projectionId) {
		this.projectionId = projectionId;
	}

	public ArrayList<Long> getSeatNumbers() {
		return seatNumbers;
	}

	public void setSeatNumbers(ArrayList<Long> seatNumbers) {
		this.seatNumbers = seatNumbers;
	}

	@Override
	public String toString() {
		return "TicketsListDtoCreate [projectionId=" + projectionId + ", seatNumbers=" + seatNumbers + "]";
	}

}
