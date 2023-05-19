package com.cinema.web.dto;

import javax.validation.constraints.NotBlank;

public class UserRegistrationDTO extends UserDTO {

    @NotBlank(message = "Password is not provided.")
    private String password;

    @NotBlank(message = "Password confirmation is not provided.")
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
}
