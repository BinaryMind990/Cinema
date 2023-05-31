package com.cinema.web.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class UserDTO {

    @Positive(message = "Id mora biti pozitivan broj.")
    private Long id;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]+$")
    private String userName;

    @NotEmpty
    @Email
    private String eMail;

    @Size(min=3, max=50)
    private String name;

    @Size(min=3, max=50)
    private String lastName;
    
    private String role;
    
    

    public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", userName=" + userName + ", eMail=" + eMail + ", name=" + name + ", lastName="
				+ lastName + ", role=" + role + "]";
	}

}
