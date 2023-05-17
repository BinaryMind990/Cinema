package com.ftninformatika.jwd.modul3.cinema.web.dto;

import javax.validation.constraints.NotBlank;

public class UserChangePasswordDTO {

    // @NotBlank(message = "Korisnicko ime nije zadato.")
    private String userName;

    // @NotBlank(message = "Stara lozinka nije zadata.")
    private String oldPassword;

    // @NotBlank(message = "Lozinka nije zadata.")
    private String password;

    // @NotBlank(message = "Ponovljena lozinka nije zadata.")
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
