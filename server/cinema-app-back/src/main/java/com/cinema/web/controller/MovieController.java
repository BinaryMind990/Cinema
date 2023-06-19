package com.cinema.web.controller;

import com.cinema.model.Movie;
import com.cinema.service.MovieService;
import com.cinema.support.MovieDTOtoMovieNew;
import com.cinema.support.MovieDTOToMovieUpdate;
import com.cinema.support.MovieToMovieDTO;
import com.cinema.web.dto.MovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/movies", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieToMovieDTO toDTO;

    @Autowired
    private MovieDTOtoMovieNew toMovieNew;

    @Autowired
    private MovieDTOToMovieUpdate toMovieUpdate;
  
    @GetMapping("/all")
    public ResponseEntity<List<MovieDTO>> getAllMovies(){
    	
    	List<Movie> movies = movieService.findAll();
    	return new ResponseEntity<>(toDTO.convertAll(movies), HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<MovieDTO>> getList(
    		@RequestParam(required = false) String name,
    		@RequestParam(required = false) Integer durationMin,
    		@RequestParam(required = false) Integer durationMax, 
    		@RequestParam(required = false) String country, 
    		@RequestParam(required = false) String distributor,
    		@RequestParam(required = false) Integer yearMin,
    		@RequestParam(required = false) Integer yearMax,
    		@RequestParam(required = false) String sortBy,
    		@RequestParam(required = false) String sortAscOrDesc,
    		@RequestParam(value = "pageNo", defaultValue = "0") int pageNo
    		){
        	
    	Page<Movie> movies = movieService.findByParameters(name, durationMin, durationMax, country, distributor, yearMin, yearMax, sortBy, sortAscOrDesc, pageNo);
    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.add("Total-Pages", Integer.toString(movies.getTotalPages()));
    	
    	return new ResponseEntity<>(toDTO.convertAll(movies.getContent()), headers, HttpStatus.OK); 
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<MovieDTO> getOne(@PathVariable Long id) {
        Movie movie = movieService.findById(id);
        if (movie != null) {
            return new ResponseEntity<>(toDTO.convert(movie), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MovieDTO> create(@Valid @RequestBody MovieDTO movieDTO) {
        Movie newMovie = movieService.save(toMovieNew.convert(movieDTO));

        return new ResponseEntity<>(toDTO.convert(newMovie), HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MovieDTO> update(@PathVariable Long id, @Valid @RequestBody MovieDTO movieDTO) {
        if (!id.equals(movieDTO.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Movie movie =  movieService.findById(id);
        if (movie == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(movieDTO.getVersion() != movie.getVersion()) {
        	return new ResponseEntity<>(toDTO.convert(movie), HttpStatus.BAD_REQUEST);
        }
        Movie movieUpdate = toMovieUpdate.convert(movieDTO);
        Movie savedMovie = movieService.update(movieUpdate);

        return new ResponseEntity<>(toDTO.convert(savedMovie), HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
    	Movie movie = movieService.findById(id);
    	 if(movie == null)
    		 return new ResponseEntity<>("Chosen id doesn't exist", HttpStatus.NOT_FOUND);
    	 if(movie.isDeleted())
    		 return new ResponseEntity<>("Chosen movie is already deleted", HttpStatus.BAD_REQUEST);    	
        Movie deleted = movieService.delete(id);

        if (deleted != null) {
            return new ResponseEntity<>("Movie deleted successfully", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("You can't delete \"" + movie.getName() + "\" because there are projections that haven't started yet", HttpStatus.BAD_REQUEST);
        }
    }
}
