package com.cinema.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.model.Hall;
import com.cinema.service.HallService;
import com.cinema.support.HallToHallDTO;
import com.cinema.web.dto.HallDTO;

@RestController
@RequestMapping(value = "api/halls", produces = MediaType.APPLICATION_JSON_VALUE)
public class HallController {

	@Autowired
	private HallService hallService;

	@Autowired
	private HallToHallDTO toDto;

	@GetMapping
	public ResponseEntity<List<HallDTO>> getAll() {
		List<Hall> allHalls = hallService.findAll();

		return new ResponseEntity<>(toDto.convertAll(allHalls), HttpStatus.OK);
	}

}
