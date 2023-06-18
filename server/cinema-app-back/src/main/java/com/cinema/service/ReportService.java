package com.cinema.service;

import java.time.LocalDate;
import java.util.List;

import com.cinema.web.dto.ReportDto;

public interface ReportService {
	
	List<ReportDtoInterface> reportList(LocalDate dateFrom, LocalDate dateTo, String sortBy, String sort);
	
	List<ReportDto> reportInService(LocalDate dateFrom, LocalDate dateTo, String sortBy, String sort); 

}
