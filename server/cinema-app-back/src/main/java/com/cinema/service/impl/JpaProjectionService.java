package com.cinema.service.impl;

import com.cinema.model.Hall;
import com.cinema.model.Projection;
import com.cinema.model.Type;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaProjectionService implements ProjectionService {

	@Autowired
	private ProjectionRep projectionRep;

	
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
	public Projection save(ProjectionDTOCreate dto) {
		
		
		int hallId = dto.getHallId().intValue();
		switch (dto.getTypeId().intValue()) {
		case 1:
			if(hallId == 1 || hallId == 2 || hallId == 3) {
				break;
			}
			else return null;
		case 2:
			if(hallId ==1 || hallId == 4) {
			break;
			}
			else return null;
		case 3: 
			if(hallId == 4 || hallId == 5) {
			break;
			}
			return null;
		default:
			System.out.println("odabrani tip projekcije nije podrzan u odabranoj sali");
			return null;
			
		}
		Projection projection = toProjection.convert(dto);
	/*	
		if (!projection.getHall().getTypes().stream().map(t -> t.getId()).collect(Collectors.toList()).contains(projection.getType().getId())) {
			
			System.out.println("odabrani tip projeckije nije podrzan u odabranoj sali");
			return null;
		}
*/
		
		
		if (projection.getDateAndTime().isBefore(LocalDateTime.now())) {
			System.out.println("Projekcija ne moze biti u proslosti");
			return null;
		}
		List<Projection> projections = projectionRep.findList(projection.getHall().getId(),
				projection.getDateAndTime());
		boolean occupiedTime = false;

		if (projections.stream().anyMatch(p -> p.getDateAndTime().equals(projection.getDateAndTime()))) {
			System.out.println("projekcija se poklapa sa postojecom projekcijom u odabranoj sali");
			return null;
		}
		occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isBefore(projection.getDateAndTime()))
				.anyMatch(p -> projection.getDateAndTime()
						.isBefore(p.getDateAndTime().plusMinutes(p.getMovie().getDuration())));

		if (occupiedTime) {
			System.out.println("projekcija se poklapa sa postojecom projekcijom u odabranoj sali");
			return null;
		}
		occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isAfter(projection.getDateAndTime()))
				.anyMatch(p -> projection.getDateAndTime().plusMinutes(projection.getMovie().getDuration())
						.isAfter(p.getDateAndTime()));
		if (occupiedTime) {
			System.out.println("projekcija se poklapa sa postojecom projekcijom u odabranoj sali");
			return null;
		}
		if(projection.getMovie().isDeleted())
			return null;
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
		System.out.println("datum u servisu radi" + date);
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
}
