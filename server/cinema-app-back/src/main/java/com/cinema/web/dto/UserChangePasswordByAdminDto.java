package com.cinema.web.dto;

import javax.validation.constraints.NotBlank;

public class UserChangePasswordByAdminDto {
	
	@NotBlank (message = "Korisnicko ime nije zadato")
	private String userName;
	
	@NotBlank(message = "Sifra nije zadata")
	private String password;
	
	@NotBlank(message = "Ponovljena sifra nije zadata")
	private String confirmPassword;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	@Override
	public String toString() {
		return "UserChangePasswordByAdminDto [userName=" + userName + ", password=" + password + ", confirmPassword="
				+ confirmPassword + "]";
	}
	

}
