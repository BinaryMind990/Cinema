package com.ftninformatika.jwd.modul3.cinema.service.impl;

import com.ftninformatika.jwd.modul3.cinema.model.Projection;
import com.ftninformatika.jwd.modul3.cinema.repository.ProjectionRep;
import com.ftninformatika.jwd.modul3.cinema.service.ProjectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    	Projection savedProjection = projectionRep.save(projection);
        return savedProjection;
    }

    @Override
    public Projection update(Projection projection) {
        return null;
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
}
