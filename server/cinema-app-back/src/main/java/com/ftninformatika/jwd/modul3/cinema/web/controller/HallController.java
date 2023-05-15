package com.ftninformatika.jwd.modul3.cinema.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftninformatika.jwd.modul3.cinema.model.Hall;
import com.ftninformatika.jwd.modul3.cinema.service.HallService;
import com.ftninformatika.jwd.modul3.cinema.support.HallToHallDto;
import com.ftninformatika.jwd.modul3.cinema.web.dto.HallDto;

@RestController
@RequestMapping(value = "api/halls", produces = MediaType.APPLICATION_JSON_VALUE)
public class HallController {
	
	@Autowired
	private HallService hallService;
	
	@Autowired
	private HallToHallDto toDto;
	
	@GetMapping
	public ResponseEntity<List<HallDto>> getAll(){
		List<Hall> allHalls = hallService.findAll();
		
		return new ResponseEntity<>(toDto.convertAll(allHalls), HttpStatus.OK);
	}

}
