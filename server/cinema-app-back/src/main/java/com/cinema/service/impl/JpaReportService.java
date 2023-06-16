package com.cinema.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.model.Movie;
import com.cinema.model.Projection;
import com.cinema.repository.ProjectionRep;
import com.cinema.repository.ReportRep;
import com.cinema.service.ReportDtoInterface;
import com.cinema.service.ReportService;
import com.cinema.web.dto.ReportDto;

@Service
public class JpaReportService implements ReportService {

	@Autowired
	private ReportRep reportRep;
	
	@Autowired
	private ProjectionRep projectionRep;

	@Override
	public List<ReportDtoInterface> reportList(LocalDate dateFrom, LocalDate dateTo, String sortBy, String sort) {
		List<ReportDtoInterface>	reportList = reportRep.getReport(dateFrom, dateTo);
		if(sort.equals("asc")) {
			
			if(sortBy.equals("numberOfProjections")) {
			Collections.sort(reportList, Comparator.comparing(r -> r.getNumberOfProjections()));
			}else if(sortBy.equals("earnings")){
				Collections.sort(reportList, Comparator.comparing(r -> r.getSum()));
			}else if(sortBy.equals("soldTickets"))
				Collections.sort(reportList, Comparator.comparing(r -> r.getSoldTicketsForMovie()));
			}else {
			reportList.sort(Comparator.comparing(ReportDtoInterface :: getSum, Collections.reverseOrder()));
			if(sortBy.equals("numberOfProjections")) {
				reportList.sort(Comparator.comparing(ReportDtoInterface :: getNumberOfProjections, Collections.reverseOrder()));
				}else if(sortBy.equals("earnings")){
					reportList.sort(Comparator.comparing(ReportDtoInterface :: getSum, Collections.reverseOrder()));
				}else if(sortBy.equals("soldTickets"))
					reportList.sort(Comparator.comparing(ReportDtoInterface :: getSoldTicketsForMovie, Collections.reverseOrder()));
				}
		
		return reportList;
	}

	@Override
	public List<ReportDto> reportInService(LocalDate dateFrom, LocalDate dateTo, String sortBy, String sort) {
		List<Projection> projections = projectionRep.findByDateAndTimeBetween(dateFrom, dateTo);
		
		List<Movie> movies =  projections.stream().map(Projection :: getMovie).distinct().collect(Collectors.toList());
		movies.forEach(m -> System.out.println(m));
		List<ReportDto> reportList = new ArrayList<ReportDto>();
		projections.forEach(p -> System.out.println(p));
		for(Movie m : movies) {
			List<Projection> projectionsForMovie = projections.stream().filter(p -> p.getMovie().getId() == m.getId()).collect(Collectors.toList());
			int numberOfProjections = projectionsForMovie.size();
			double earning = projectionsForMovie.stream().mapToDouble(Projection :: earningFromProjection).sum();
			int soldTickets = projectionsForMovie.stream().mapToInt(p -> p.getTickets().size()).sum();
			
			ReportDto reportDto = new ReportDto(m.getId(), m.getName(), numberOfProjections, earning, soldTickets);
			reportList.add(reportDto);
		}
	
		if(sort.equals("asc")) {
			
		if(sortBy.equals("numberOfProjections")) {
		Collections.sort(reportList, Comparator.comparing(r -> r.getNumberOfProjections()));
		}else if(sortBy.equals("earnings")){
			Collections.sort(reportList, Comparator.comparing(r -> r.getSum()));
		}else if(sortBy.equals("soldTickets"))
			Collections.sort(reportList, Comparator.comparing(r -> r.getSoldTicketsForMovie()));
		}else {
		reportList.sort(Comparator.comparing(ReportDto :: getSum, Collections.reverseOrder()));
		if(sortBy.equals("numberOfProjections")) {
			reportList.sort(Comparator.comparing(ReportDto :: getNumberOfProjections, Collections.reverseOrder()));
			}else if(sortBy.equals("earnings")){
				reportList.sort(Comparator.comparing(ReportDto :: getSum, Collections.reverseOrder()));
			}else if(sortBy.equals("soldTickets"))
				reportList.sort(Comparator.comparing(ReportDto :: getSoldTicketsForMovie, Collections.reverseOrder()));
			}
		return reportList;
		}	
}
