package com.cinema.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.model.Type;
import com.cinema.service.TypeService;
import com.cinema.support.TypeToTypeDTO;
import com.cinema.web.dto.TypeDTO;

@RestController
@RequestMapping(value = "api/types", produces = MediaType.APPLICATION_JSON_VALUE)
public class TypeController {

	@Autowired
	private TypeService typeService;

	@Autowired
	private TypeToTypeDTO toDto;

	@GetMapping
	public ResponseEntity<List<TypeDTO>> getAll() {
		List<Type> allTypes = typeService.findAll();
		return new ResponseEntity<>(toDto.convertAll(allTypes), HttpStatus.OK);
	}

}
