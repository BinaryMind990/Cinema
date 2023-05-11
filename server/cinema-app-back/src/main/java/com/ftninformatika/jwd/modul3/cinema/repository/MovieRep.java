package com.ftninformatika.jwd.modul3.cinema.repository;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRep extends JpaRepository<Movie, Long> {

    Movie findOneById(Long id);

    Movie save(Movie movie);


}
