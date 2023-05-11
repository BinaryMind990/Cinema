package com.ftninformatika.jwd.modul3.cinema.service;


import com.ftninformatika.jwd.modul3.cinema.model.Movie;
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
