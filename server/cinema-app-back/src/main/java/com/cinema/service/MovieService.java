package com.cinema.service;

import com.cinema.model.Movie;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.Optional;

public interface MovieService {
    Optional<Movie> findOne(Long id);

    Movie findById(Long id);

    List<Movie> findAll();

    Movie save(Movie movie);

    Movie update(Movie movie);

    Movie delete(Long id);

    Page<Movie> search();
}
