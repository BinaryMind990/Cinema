package com.cinema.web.dto;

import java.util.List;

public class HallDTO {

	private Long id;

	private String name;

	private List<Long> typesId;

	public Long getId() {
		return id;
	}

	public List<Long> seats;

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Long> getTypesId() {
		return typesId;
	}

	public void setTypesId(List<Long> typesId) {
		this.typesId = typesId;
	}

	public List<Long> getSeats() {
		return seats;
	}

	public void setSeats(List<Long> seats) {
		this.seats = seats;
	}

}
