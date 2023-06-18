package com.cinema.service;

import com.cinema.model.Projection;
import com.cinema.web.dto.ProjectionDTOCreate;

import java.time.LocalDate;
import java.util.List;

public interface ProjectionService {
    Projection findOne(Long id);

    List<Projection> findAll();
    
    List<Projection> findAllAfterNow();

    String save(ProjectionDTOCreate dto);

    Projection update(Projection projection);

    Projection delete(Long id);

    List<Projection> search(LocalDate date);

	List<Projection> findList(Long movieId, LocalDate localDate, Long typeId, Long hallId, Double minPrice,
			Double maxPrice, String sortBy, String sortAscOrDesc);

	List<String> findDates();

}
