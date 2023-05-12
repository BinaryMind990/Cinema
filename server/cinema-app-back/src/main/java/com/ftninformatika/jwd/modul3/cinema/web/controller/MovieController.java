package com.ftninformatika.jwd.modul3.cinema.web.controller;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.service.MovieService;
import com.ftninformatika.jwd.modul3.cinema.support.MovieDTOtoMovieNew;
import com.ftninformatika.jwd.modul3.cinema.support.MovieDtoToMovieUpdate;
import com.ftninformatika.jwd.modul3.cinema.support.MovieToMovieDTO;
import com.ftninformatika.jwd.modul3.cinema.web.dto.MovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/movies", produces = MediaType.APPLICATION_JSON_VALUE)
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieToMovieDTO toDTO;
    
    @Autowired
    private MovieDTOtoMovieNew toMovieNew;
    
    @Autowired
    private MovieDtoToMovieUpdate toMovieUpdate;

    @GetMapping
    public ResponseEntity<List<MovieDTO>>getAll(){

        List<Movie> movies = movieService.findAll();

        return new ResponseEntity<>(toDTO.convertAll(movies), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<MovieDTO> getOne(@PathVariable Long id){
        Movie movie = movieService.findById(id);
        if(movie != null){
            return new ResponseEntity<>(toDTO.convert(movie), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MovieDTO> create(@RequestBody MovieDTO movieDTO){
    	Movie newMovie = movieService.save(toMovieNew.convert(movieDTO));
    	
        return new ResponseEntity<>(toDTO.convert(newMovie), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MovieDTO> update(@PathVariable Long id, @Valid @RequestBody MovieDTO movieDTO){
        if(!id.equals(movieDTO.getId())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(movieService.findById(id) == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Movie movie = toMovieUpdate.convert(movieDTO);
        Movie savedMovie = movieService.update(movie);

        return new ResponseEntity<>(toDTO.convert(savedMovie), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Movie deleted = movieService.delete(id);

        if(deleted != null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
/*
    private LocalDateTime getLocalDateTime(String datumIVreme) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate datum = LocalDate.parse(datumIVreme.substring(0, 10), formatter);
        LocalTime vreme = LocalTime.parse(datumIVreme.substring(11), DateTimeFormatter.ofPattern("HH:mm"));
        return LocalDateTime.of(datum, vreme);
    }
    */
}
