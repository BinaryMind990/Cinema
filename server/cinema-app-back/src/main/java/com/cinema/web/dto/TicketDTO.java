package com.cinema.web.dto;

public class TicketDTO {

	private Long id;

	private Long seat;
	
	private Long projectionId;

	private String projectionDate;

	private String projectionTime;

	private String movieName;

	private String type;

	private String hall;

	private double price;
	
	private String ticketBuyDate;
	
	private String ticketBuyTime;
	
	

	public TicketDTO(Long id, Long seat, String date, String time, String movieName, String type, String hall,
			double price) {
		super();
		this.id = id;
		this.seat = seat;
		this.projectionDate = date;
		this.projectionTime = time;
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
	
	public String getProjectionDate() {
		return projectionDate;
	}

	public void setProjectionDate(String projectionDate) {
		this.projectionDate = projectionDate;
	}

	public String getProjectionTime() {
		return projectionTime;
	}

	public void setProjectionTime(String projectionTime) {
		this.projectionTime = projectionTime;
	}
	

	public Long getProjectionId() {
		return projectionId;
	}

	public void setProjectionId(Long projectionId) {
		this.projectionId = projectionId;
	}

	public String getTicketBuyDate() {
		return ticketBuyDate;
	}

	public void setTicketBuyDate(String ticketBuyDate) {
		this.ticketBuyDate = ticketBuyDate;
	}

	public String getTicketBuyTime() {
		return ticketBuyTime;
	}

	public void setTicketBuyTime(String ticketBuyTime) {
		this.ticketBuyTime = ticketBuyTime;
	}

	@Override
	public String toString() {
		return "TicketDTO [id=" + id + ", seat=" + seat + ", date=" + projectionDate + ", time=" + projectionTime
				+ ", movieName="
				+ movieName + ", type=" + type + ", hall=" + hall + "]";
	}

}
