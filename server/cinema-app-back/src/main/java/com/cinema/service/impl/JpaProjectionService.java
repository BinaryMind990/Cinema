package com.cinema.service.impl;

import com.cinema.model.Projection;
import com.cinema.repository.MovieRep;
import com.cinema.repository.ProjectionRep;
import com.cinema.service.ProjectionService;
import com.cinema.support.ProjectionDTOtoProjectionNew;
import com.cinema.web.dto.ProjectionDTOCreate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class JpaProjectionService implements ProjectionService {

	@Autowired
	private ProjectionRep projectionRep;
	
	@Autowired
	private MovieRep movieRep;

	
	@Autowired
	private ProjectionDTOtoProjectionNew toProjection;

	@Override
	public Projection findOne(Long id) {
		return projectionRep.findOneById(id);
	}

	@Override
	public List<Projection> findAll() {
		return projectionRep.findByDeleted(false);
	}

	@Override
	public String save(ProjectionDTOCreate dto) {
		
		if(movieRep.findOneById(dto.getMovieId()) == null) {
			return "Movie doesn't exist";
		}
		if(movieRep.findOneById(dto.getMovieId()).isDeleted()) {
			return "Movie is deleted";
		}	
	
		int hallId = dto.getHallId().intValue();
		switch (dto.getTypeId().intValue()) {
		case 1:
			if(hallId == 1 || hallId == 2 || hallId == 3) {
			break;
			}
			else return "2D projections are available in Hall 1, Hall 2 and Hall 3";
		case 2:
			if(hallId ==1 || hallId == 4) {
			break;
			}
			else return "3D projections are available in Hall 1 and Hall 4";
		case 3: 
			if(hallId == 4 || hallId == 5) {
			break;
			}else return "4D projections are available in Hall 4 and Hall 5 ";	
		default:
			
			return "Type doesn't exist";
		}
		
		Projection projection = toProjection.convert(dto);
		
		if (projection.getDateAndTime().isBefore(LocalDateTime.now().plusHours(2))) {
			return "New projection must be at least 2 hours in future";
		}
		List<Projection> projections = projectionRep.findList(projection.getHall().getId(),
				projection.getDateAndTime());
		boolean occupiedTime = false;
			
		if (projections.stream().anyMatch(p -> p.getDateAndTime().equals(projection.getDateAndTime()))) {
			
			return projection.getHall().getName() + " is not available in chosen time";
		}
		
		occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isBefore(projection.getDateAndTime()))
				.anyMatch(p -> projection.getDateAndTime()
						.isBefore(p.getDateAndTime().plusMinutes(p.getMovie().getDuration())));
			
		if (occupiedTime) {
			String [] dateTimestr = projection.getDateAndTime().toString().split("T");
			return projection.getHall().getName() + " has projection that is not ended chosen date at " + dateTimestr[1];
		}
			
		occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isAfter(projection.getDateAndTime()))
				.anyMatch(p -> projection.getDateAndTime().plusMinutes(projection.getMovie().getDuration())
						.isAfter(p.getDateAndTime()));
		if (occupiedTime) {
			return projection.getHall().getName() + " has projection that starts before this projection should be ended";
		}
		
		Projection savedProjection = projectionRep.save(projection);
		if(savedProjection == null) {
			return "Projection is not saved";
		}
		return "success";
	}

	@Override
	public Projection update(Projection projection) {
		return projectionRep.save(projection);
	}

	@Override
	public Projection delete(Long id) {
		Projection projection = findOne(id);
		if (projection != null  && projection.getTickets().isEmpty()) {
			projection.getMovie().getProjections().remove(projection);
			projectionRep.delete(projection);
			return projection;
		}
		if(projection != null && !projection.getTickets().isEmpty()) {
			projection.setDeleted(true);
			return projectionRep.save(projection);
		}
		return null;
	}

	@Override
	public List<Projection> search(LocalDate date) {
		return projectionRep.search(date);
	}

	@Override
	public List<Projection> findList(Long movieId, LocalDate localDate, Long typeId, Long hallId, Double minPrice,
			Double maxPrice, String sortBy, String sortAscOrDesc) {
			if(minPrice == null || minPrice < 0)
				minPrice = 0.0;
			if(maxPrice == null || maxPrice < minPrice)
				maxPrice =Double.MAX_VALUE;
			if(sortBy == null)
				sortBy = "dateAndTime";
			if(!sortBy.equals("movie") && !sortBy.equals("ticketPrice") && !sortBy.equals("type") && !sortBy.equals("hall"))
			sortBy = "dateAndTime";
			if(sortAscOrDesc == null || !sortAscOrDesc.equals("desc")) {
		return projectionRep.findByParameters(movieId, localDate, typeId, hallId, minPrice, maxPrice, Sort.by(sortBy).ascending());
			} else {
				return projectionRep.findByParameters(movieId, localDate, typeId, hallId, minPrice, maxPrice, Sort.by(sortBy).descending());
			}	
		}

	@Override
	public List<Projection> findAllAfterNow() {
			return projectionRep.findByDateAndTimeAfter();
	}

	@Override
	public List<String> findDates() {	
		return projectionRep.findDates();
	}
}
