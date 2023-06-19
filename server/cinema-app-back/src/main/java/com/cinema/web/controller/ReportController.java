package com.cinema.web.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.service.ReportDtoInterface;
import com.cinema.service.ReportService;
import com.cinema.web.dto.ReportDto;

@RestController
@RequestMapping(value = "api/report", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportController {
	
	@Autowired
	private ReportService reportService;

	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<ReportDtoInterface>> getReport(
			@RequestParam(required = false) String dateFrom, 
			@RequestParam(required = false) String dateTo,
			@RequestParam(required = false, defaultValue = "numberOfProjections") String sortBy,
			@RequestParam(required = false, defaultValue = "desc") String sort){

		LocalDate localDateFrom = LocalDate.of(1900, 01, 01);
		LocalDate localDateTo = LocalDate.of(2300,01,01);
		if(dateFrom != null) {
			try {
				localDateFrom = getLocalDate(dateFrom);
			} catch (Exception e) {
			}
		}
		if(dateTo != null) {
			try {
				localDateTo = getLocalDate(dateTo);
			} catch (Exception e) {
			}
		}

		List<ReportDtoInterface> reportList = reportService.reportList(localDateFrom, localDateTo, sortBy, sort);
		return new ResponseEntity<>(reportList, HttpStatus.OK);

	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping (value = "/1")  
	public ResponseEntity<List<ReportDto>> getProjectionsBetween(
			@RequestParam(required = false) String dateFrom, 
			@RequestParam(required = false) String dateTo,
			@RequestParam(required = false, defaultValue = "numberOfProjections") String sortBy,
			@RequestParam(required = false, defaultValue = "desc") String sort)
	{
		LocalDate localDateFrom =LocalDate.of(1900, 01, 01);
		LocalDate localDateTo = LocalDate.of(2300, 01, 01);
		if(dateFrom != null) {
			try {
				localDateFrom = getLocalDate(dateFrom);
			} catch (Exception e) {
			}
		}
		if(dateTo != null) {
			try {
				localDateTo = getLocalDate(dateTo);
			} catch (Exception e) {
			}
		}
		
		List<ReportDto> reportList = reportService.reportInService(localDateFrom, localDateTo, sortBy, sort);
		ReportDto reportDtoInTotal = new ReportDto();
		reportDtoInTotal.setMovieId(Long.MAX_VALUE);
		reportDtoInTotal.setName("All movies");
		reportDtoInTotal.setNumberOfProjections(reportList.stream().mapToInt(r -> r.getNumberOfProjections()).sum());
		reportDtoInTotal.setSoldTicketsForMovie(reportList.stream().mapToInt(r -> r.getSoldTicketsForMovie()).sum());
		reportDtoInTotal.setSum(reportList.stream().mapToDouble(r -> r.getSum()).sum());
		reportList.add(reportDtoInTotal);
		
		return new ResponseEntity<>(reportList, HttpStatus.OK);
	}
	
	
	 private LocalDate getLocalDate(String dateStr) throws DateTimeParseException {
	        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	        return LocalDate.parse(dateStr, dtf);
	    }
}
