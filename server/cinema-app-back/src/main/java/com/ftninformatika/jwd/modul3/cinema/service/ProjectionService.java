package com.ftninformatika.jwd.modul3.cinema.service;

import com.ftninformatika.jwd.modul3.cinema.model.Movie;
import com.ftninformatika.jwd.modul3.cinema.model.Projection;

import java.time.LocalDate;
import java.util.List;

public interface ProjectionService {
    Projection findOne(Long id);

    List<Projection> findAll();

    Projection save(Projection projection);

    Projection update(Projection projection);
    
    Projection delete(Long id);

    List<Projection> search(LocalDate date);

}
