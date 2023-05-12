package com.ftninformatika.jwd.modul3.cinema.web.controller;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.repository.ProjectionRep;
import com.ftninformatika.jwd.modul3.cinema.service.ProjectionService;
import com.ftninformatika.jwd.modul3.cinema.support.ProjectionDTOtoProjectionNew;
import com.ftninformatika.jwd.modul3.cinema.support.ProjectionToProjectionDTO;
import com.ftninformatika.jwd.modul3.cinema.web.dto.ProjectionDTO;
import com.ftninformatika.jwd.modul3.cinema.web.dto.ProjectionDtoCreate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/projections", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class ProjectionController {
	
	@Autowired
	private ProjectionRep projectionRep;

    @Autowired
    private ProjectionService projectionService;
    
    @Autowired
    private ProjectionToProjectionDTO toDto;
    
    @Autowired
    private ProjectionDTOtoProjectionNew toProjectionNew;

    @GetMapping
    public ResponseEntity<List<ProjectionDTO>> getAll(){

        List<Projection> projections = projectionService.findAll();

        return new ResponseEntity<>(toDto.convertAll(projections), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProjectionDTO> getOne(@PathVariable Long id){
    	Projection projection = projectionService.findOne(id);
    	if(projection != null) {
    		return new ResponseEntity<>(toDto.convert(projection), HttpStatus.OK);
    	}
    	else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    				
    }
   /* ovom metodom sam proveravao query u ProjectionRep
    @GetMapping("/search")
    public ResponseEntity<List<ProjectionDTO>> getList(
    		@RequestParam Long hallId, @RequestParam String dateTime){
    	LocalDateTime dt = getLocalDateTime(dateTime);
    	
    	List<Projection> projections = projectionRep.findList(hallId, dt);
    	return new ResponseEntity<>(toDto.convertAll(projections), HttpStatus.OK);
    	
    				
    }
    */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
    	Projection deletedProjection = projectionService.delete(id);
    	
    	if(deletedProjection != null) {
    		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    	} else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}	
    }
    
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectionDTO> create(@RequestBody ProjectionDtoCreate dto){
    	
    	
    	Projection newProjection = toProjectionNew.convert(dto);
    	Projection savedProjection = projectionService.save(newProjection);
    	if(savedProjection == null)
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	
    	return new ResponseEntity<>(toDto.convert(savedProjection), HttpStatus.CREATED);
    }
    private LocalDateTime getLocalDateTime(String dateTime) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(dateTime, formatter);
    }   
}
