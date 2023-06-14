package com.cinema.web.dto;

public class UserDtoForAdminView {
	
	private long id;
	
	private String username;
	
	private String registrationDateTime;
	
	private String userRole;
	
	private String eMail;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRegistrationDateTime() {
		return registrationDateTime;
	}

	public void setRegistrationDateTime(String registrationDateTime) {
		this.registrationDateTime = registrationDateTime;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	@Override
	public String toString() {
		return "UserDtoForAdminView [id=" + id + ", username=" + username + ", registrationDateTime="
				+ registrationDateTime + ", userRole=" + userRole + "]";
	}

}
