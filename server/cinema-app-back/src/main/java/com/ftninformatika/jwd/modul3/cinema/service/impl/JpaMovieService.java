package com.ftninformatika.jwd.modul3.cinema.service.impl;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import com.ftninformatika.jwd.modul3.cinema.repository.MovieRep;
import com.ftninformatika.jwd.modul3.cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class JpaMovieService implements MovieService {

    @Autowired
    private MovieRep movieRep;


    @Override
    public Optional<Movie> findOne(Long id) {
        return Optional.empty();
    }

    @Override
    public Movie findById(Long id) {
        return  movieRep.findOneById(id);
    }

    @Override
    public List<Movie> findAll() {
        return movieRep.findAll();
    }

    @Override
    public Movie save(Movie movie) {
        return movieRep.save(movie);
    }

    @Override
    public Movie update(Movie movie) {
        return null;
    }

    @Override
    public Movie delete(Long id) {
        Optional<Movie> movie = movieRep.findById(id);
        if(movie.isPresent()){
            movieRep.deleteById(id);
            return movie.get();
        }
        return null;

    }

    @Override
    public Page<Movie> search() {
        return null;
    }

   /* private LocalDateTime getDateConverted(String dateTime) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(dateTime, formatter);
    }
    */
}
