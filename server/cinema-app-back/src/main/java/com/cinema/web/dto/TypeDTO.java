package com.cinema.web.dto;

import java.util.List;

public class TypeDTO {

	private Long id;

	private String name;

	private List<Long> hallsId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Long> getHallsId() {
		return hallsId;
	}

	public void setHallsId(List<Long> hallsId) {
		this.hallsId = hallsId;
	}

}
