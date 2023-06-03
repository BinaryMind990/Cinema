package com.cinema.web.controller;

import com.cinema.model.Projection;
import com.cinema.service.ProjectionService;
import com.cinema.support.ProjectionDTOtoProjectionNew;
import com.cinema.support.ProjectionToProjectionDTO;
import com.cinema.web.dto.ProjectionDTO;
import com.cinema.web.dto.ProjectionDTOCreate;
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
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/projections", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class ProjectionController {

    @Autowired
    private ProjectionService projectionService;

    @Autowired
    private ProjectionToProjectionDTO toDto;

    @Autowired
    private ProjectionDTOtoProjectionNew toProjectionNew;

    @GetMapping
    public ResponseEntity<List<ProjectionDTO>> search(@RequestParam(required = false) String date) {
        List<Projection> projections;
        if (date != null) {
            LocalDate localDate;
            try {
                localDate = getLocalDate(date);
            } catch (DateTimeParseException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            projections = projectionService.search(localDate);
        } else {
            projections = projectionService.findAll();
        }
        return new ResponseEntity<>(toDto.convertAll(projections), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectionDTO> getOne(@PathVariable Long id) {
        Projection projection = projectionService.findOne(id);
        if (projection != null) {
            return new ResponseEntity<>(toDto.convert(projection), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

      @GetMapping("/search")
      public ResponseEntity<List<ProjectionDTO>> getList(
      @RequestParam(required = false) Long movieId,
      @RequestParam(required = false) String date,
      @RequestParam(required = false) Long typeId,
      @RequestParam(required = false) Long hallId,
      @RequestParam(required = false) Double minPrice,
      @RequestParam(required = false) Double maxPrice,
      @RequestParam(required = false) String sortBy,
      @RequestParam(required = false) String sortAscOrDesc
      ){
    	  LocalDate localDate;
    	  if(date == null) {
    		 localDate = null;
    	  }else {
    	  try {
    		  localDate = getLocalDate(date);
		} catch (DateTimeParseException e) {
			localDate = LocalDate.now();
		}
    	}
           
      List<Projection> projections = projectionService.findList(movieId, localDate, typeId, hallId, minPrice, maxPrice, sortBy, sortAscOrDesc);
      return new ResponseEntity<>(toDto.convertAll(projections), HttpStatus.OK);
      
      
      }
     
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Projection deletedProjection = projectionService.delete(id);

        if (deletedProjection != null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectionDTO> create(@Valid @RequestBody ProjectionDTOCreate dto) {

        Projection newProjection = toProjectionNew.convert(dto);
        Projection savedProjection = projectionService.save(newProjection);
        if (savedProjection == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(toDto.convert(savedProjection), HttpStatus.CREATED);
    }
/*
    private LocalDateTime getLocalDateTime(String dateTime) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(dateTime, formatter);
    }
*/
    private LocalDate getLocalDate(String dateStr) throws DateTimeParseException {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return LocalDate.parse(dateStr, dtf);
    }
}
