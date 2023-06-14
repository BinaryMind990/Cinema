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
	public Projection save(ProjectionDTOCreate dto) {

		if (movieRep.findOneById(dto.getMovieId()) == null) {
			System.out.println("odabran je nepostojeci film");
			return null;
		}
		if (movieRep.findOneById(dto.getMovieId()).isDeleted()) {
			System.out.println("ne moze se kreirati projekcija jer je film obrisan");
			return null;
		}
		// provera da li je odabrani tip podrzan u odabranoj sali
		int hallId = dto.getHallId().intValue();
		switch (dto.getTypeId().intValue()) {
			case 1:
				if (hallId == 1 || hallId == 2 || hallId == 3) {
					break;
				} else
					return null;
			case 2:
				if (hallId == 1 || hallId == 4) {
					break;
				} else
					return null;
			case 3:
				if (hallId == 4 || hallId == 5) {
					break;
				} else
					return null;
			default:
				System.out.println("odabrani tip projekcije nije podrzan u odabranoj sali");
				return null;
		}

		Projection projection = toProjection.convert(dto);
		/*
		 * if (!projection.getHall().getTypes().stream().map(t ->
		 * t.getId()).collect(Collectors.toList()).contains(projection.getType().getId()
		 * )) {
		 * 
		 * System.out.println("odabrani tip projeckije nije podrzan u odabranoj sali");
		 * return null;
		 * }
		 */

		/*
		 * System.out.println(projection.getHall().getTypes().contains(projection.
		 * getType()));
		 * System.out.println(projection.getHall().getTypes());
		 * System.out.println(projection.getType());
		 * if (!projection.getHall().getTypes().contains(projection.getType())) {
		 * 
		 * System.out.println("odabrani tip projeckije nije podrzan u odabranoj sali");
		 * return null;
		 * }
		 */

		// ako je uneto vreme projekcije pre trenutnog vremena plus 2 sata
		if (projection.getDateAndTime().isBefore(LocalDateTime.now().plusHours(2))) {
			System.out.println("Projekcija ne moze biti u proslosti ili manje od dva sata u buducnosti");
			return null;
		}
		List<Projection> projections = projectionRep.findList(projection.getHall().getId(),
				projection.getDateAndTime());
		boolean occupiedTime = false;
		// ako ima projekcija u isto vreme
		if (projections.stream().anyMatch(p -> p.getDateAndTime().equals(projection.getDateAndTime()))) {
			System.out.println("projekcija se poklapa sa postojecom projekcijom u odabranoj sali");
			return null;
		}
		// projekcija pocinje pre nego sto se prethodna projekcija u toj sali zavrsila
		occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isBefore(projection.getDateAndTime()))
				.anyMatch(p -> projection.getDateAndTime()
						.isBefore(p.getDateAndTime().plusMinutes(p.getMovie().getDuration())));

		if (occupiedTime) {
			System.out.println("projekcija se poklapa sa postojecom projekcijom u odabranoj sali");
			return null;
		}
		// postoji projekcija koja pocinje u istoj sali pre nego sto se uneta projekcija
		// zavrsi
		occupiedTime = projections.stream().filter(p -> p.getDateAndTime().isAfter(projection.getDateAndTime()))
				.anyMatch(p -> projection.getDateAndTime().plusMinutes(projection.getMovie().getDuration())
						.isAfter(p.getDateAndTime()));
		if (occupiedTime) {
			System.out.println("projekcija se poklapa sa postojecom projekcijom u odabranoj sali");
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
		if (projection != null && projection.getTickets().isEmpty()) {
			projection.getMovie().getProjections().remove(projection);
			projectionRep.delete(projection);
			return projection;
		}
		if (projection != null && !projection.getTickets().isEmpty()) {
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
		if (minPrice == null || minPrice < 0)
			minPrice = 0.0;
		if (maxPrice == null || maxPrice < minPrice)
			maxPrice = Double.MAX_VALUE;
		if (sortBy == null)
			sortBy = "dateAndTime";
		if (!sortBy.equals("movie") && !sortBy.equals("ticketPrice") && !sortBy.equals("type") && !sortBy.equals("hall"))
			sortBy = "dateAndTime";
		if (sortAscOrDesc == null || !sortAscOrDesc.equals("desc")) {
			return projectionRep.findByParameters(movieId, localDate, typeId, hallId, minPrice, maxPrice,
					Sort.by(sortBy).ascending());
		} else {
			return projectionRep.findByParameters(movieId, localDate, typeId, hallId, minPrice, maxPrice,
					Sort.by(sortBy).descending());
		}

	}
}
