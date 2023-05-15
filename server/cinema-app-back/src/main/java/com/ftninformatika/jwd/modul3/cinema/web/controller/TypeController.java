package com.ftninformatika.jwd.modul3.cinema.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftninformatika.jwd.modul3.cinema.model.Type;
import com.ftninformatika.jwd.modul3.cinema.service.TypeService;
import com.ftninformatika.jwd.modul3.cinema.support.TypeToTypeDto;
import com.ftninformatika.jwd.modul3.cinema.web.dto.TypeDto;

@RestController
@RequestMapping(value = "api/types", produces = MediaType.APPLICATION_JSON_VALUE)
public class TypeController {
	
	@Autowired
	private TypeService typeService;
	
	@Autowired
	private TypeToTypeDto toDto;
	
	@GetMapping
	public ResponseEntity<List<TypeDto>> getAll(){
		List<Type> allTypes = typeService.findAll();
		return new ResponseEntity<>(toDto.convertAll(allTypes), HttpStatus.OK);
	}
	
}
