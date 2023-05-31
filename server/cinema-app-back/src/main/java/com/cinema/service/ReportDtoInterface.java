package com.cinema.service;


public interface ReportDtoInterface {
	
	Long getMovieId();
	String getName();
    int getNumberOfProjections();
	double getSum();
	int getSoldTicketsForMovie();
}
