package com.ftninformatika.jwd.modul3.cinema.service.impl;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.repository.ProjectionRep;
import com.ftninformatika.jwd.modul3.cinema.service.ProjectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class JpaProjectionService implements ProjectionService {

    @Autowired
    private ProjectionRep projectionRep;

    @Override
    public Projection findOne(Long id) {
        return projectionRep.findOneById(id);
    }

    @Override
    public List<Projection> findAll() {
        return projectionRep.findAll();
    }

    @Override
    public Projection save(Projection projection) {
    	
    	if(!projection.getHall().getTypes().contains(projection.getType())) {
    		return null;
    	}
    	
    	if(projection.getDateAndTime().isBefore(LocalDateTime.now())) {
    		return null;
    	}
    	List<Projection> projections = projectionRep.findList(projection.getHall().getId(), projection.getDateAndTime());
    	boolean occupiedTime = false;
    	
    	if(projections.stream().anyMatch(p -> p.getDateAndTime().equals(projection.getDateAndTime())))
    		return null;
    
    	occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isBefore(projection.getDateAndTime())).
    			anyMatch(p -> projection.getDateAndTime().isBefore(p.getDateAndTime().plusMinutes(p.getMovie().getDuration())));
    
    	if(occupiedTime) {
    		return null;}
    	occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isAfter(projection.getDateAndTime())).
    			anyMatch(p -> projection.getDateAndTime().plusMinutes(projection.getMovie().getDuration()).isAfter(p.getDateAndTime()));
    	if(occupiedTime) {
    		return null;
    	}
    	
    	Projection savedProjection = projectionRep.save(projection);
        return savedProjection;
    }

    @Override
    public Projection update(Projection projection) {
        return projectionRep.save(projection);
    }

	@Override
	public Projection delete(Long id) {
		Projection projection = findOne(id);
		if(projection != null) {
			projection.getMovie().getProjections().remove(projection);
			projectionRep.delete(projection);
			return projection;
		}
		return null;
	}

	@Override
	public List<Projection> search(LocalDate date) {
		System.out.println("datum u servisu radi"+ date);
		return projectionRep.search(date);
	}
}
