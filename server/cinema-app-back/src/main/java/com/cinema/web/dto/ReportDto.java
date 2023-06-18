package com.cinema.web.dto;

public class ReportDto{
	
	private Long movieId;
	
	private String name;

	private int numberOfProjections;

	private double sum;
	
	private int soldTicketsForMovie;
	
	public ReportDto() {
		super();
	}

	public ReportDto(Long movieId, String name, int numberOfProjections, double sum, int soldTicketsForMovie) {
		super();
		this.movieId = movieId;
		this.name = name;
		this.numberOfProjections = numberOfProjections;
		this.sum = sum;
		this.soldTicketsForMovie = soldTicketsForMovie;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfProjections() {
		return numberOfProjections;
	}

	public void setNumberOfProjections(int numberOfProjections) {
		this.numberOfProjections = numberOfProjections;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

	public int getSoldTicketsForMovie() {
		return soldTicketsForMovie;
	}

	public void setSoldTicketsForMovie(int soldTicketsForMovie) {
		this.soldTicketsForMovie = soldTicketsForMovie;
	}

	@Override
	public String toString() {
		return "ReportDto [movieId=" + movieId + ", name=" + name + ", numberOfProjections=" + numberOfProjections
				+ ", sum=" + sum + ", soldTicketsForMovie=" + soldTicketsForMovie + "]";
	}
}
