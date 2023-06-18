package com.cinema.web.dto;

import java.util.Objects;

public class TicketDtoForDisplay {
	
	private Long id;
	
	private String ticketSellDate;
	
	private String ticketSellTime;
	
	private String userName;
	
	private Long userId;
	
	private Long seatNumber;

	public String getTicketSellDate() {
		return ticketSellDate;
	}

	public void setTicketSellDate(String ticketSellDate) {
		this.ticketSellDate = ticketSellDate;
	}

	public String getTicketSellTime() {
		return ticketSellTime;
	}

	public void setTicketSellTime(String ticketSellTime) {
		this.ticketSellTime = ticketSellTime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}
	

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(Long seatNumber) {
		this.seatNumber = seatNumber;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, ticketSellDate, ticketSellTime, userId, userName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TicketDtoForDisplay other = (TicketDtoForDisplay) obj;
		return Objects.equals(id, other.id) && Objects.equals(ticketSellDate, other.ticketSellDate)
				&& Objects.equals(ticketSellTime, other.ticketSellTime) && Objects.equals(userId, other.userId)
				&& Objects.equals(userName, other.userName);
	}

	@Override
	public String toString() {
		return "TicketDtoForAdmin [id=" + id + ", ticketSellDate=" + ticketSellDate + ", ticketSellTime="
				+ ticketSellTime + ", userName=" + userName + ", userId=" + userId + "]";
	}
}
