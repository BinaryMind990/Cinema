package com.ftninformatika.jwd.modul3.cinema.web.dto;

import org.springframework.stereotype.Component;

@Component
public class TicketDTO {

    private Long id;
    
    private Long seat;
    
    private String date;
    
    private String time;
    
    private String movieName;
    
    private String type;
    
    private String hall;

	private double price;

	

	public TicketDTO(Long id, Long seat, String date, String time, String movieName, String type, String hall,
			double price) {
		super();
		this.id = id;
		this.seat = seat;
		this.date = date;
		this.time = time;
		this.movieName = movieName;
		this.type = type;
		this.hall = hall;
		this.price = price;
	}

	public TicketDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSeat() {
		return seat;
	}

	public void setSeat(Long seat) {
		this.seat = seat;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getHall() {
		return hall;
	}

	public void setHall(String hall) {
		this.hall = hall;
	}
	

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "TicketDTO [id=" + id + ", seat=" + seat + ", date=" + date + ", time=" + time + ", movieName="
				+ movieName + ", type=" + type + ", hall=" + hall + "]";
	}

	
    
}
