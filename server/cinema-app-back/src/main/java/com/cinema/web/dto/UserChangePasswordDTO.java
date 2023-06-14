package com.cinema.web.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserChangePasswordDTO {

    @NotBlank(message = "You must add username")
    private String userName;

    @NotBlank(message = "You must insert old password")
    private String oldPassword;

    @NotBlank(message = "You musr insert new password.")
    @Size(min = 5, max = 15)
    private String password;

    @NotBlank(message = "You must insert confirmed password")
    @Size(min = 5, max = 15)
    private String confirmPassword;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
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
}
