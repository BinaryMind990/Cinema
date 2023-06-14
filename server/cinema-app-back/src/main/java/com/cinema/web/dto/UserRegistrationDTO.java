package com.cinema.web.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserRegistrationDTO extends UserDTO {

    @NotBlank(message = "Password is not provided.")
    @Size(min = 5, max = 15)
    private String password;

    @NotBlank(message = "Password confirmation is not provided.")
    @Size(min = 5, max = 15)
    private String confirmPassword;

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
		return "UserRegistrationDTO [password=" + password + ", confirmPassword=" + confirmPassword + "]";
	}
    
}
