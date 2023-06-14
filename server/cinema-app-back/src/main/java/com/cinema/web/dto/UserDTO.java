package com.cinema.web.dto;

import java.util.List;

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
    @Pattern(regexp = "^[a-zA-Z0-9]{3,15}$", message = "username must be between 3 and 15 characters, you can use lower case, upper case, and numbers")
    private String userName;

    @NotEmpty
    @Email 
    private String eMail;

    @Size(min=2)
    @Pattern(regexp = "^[A-Za-z][a-z']{2,30}(( |-)[a-zA-Z']{2,30}){0,3}$", message = "The name must start with a letter and contain only letters and possibly an apostrophe and a hyphen")
    private String name;

    @Size(min=2)
    @Pattern(regexp = "^[A-Za-z][a-z']{2,30}(( |-)[a-zA-Z']{2,30}){0,3}$", message = "The lastname must start with a letter and contain only letters and possibly an apostrophe and a hyphen")
    private String lastName;
    
    private String role;
    
    private List<TicketDTO> tickets;

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

	public List<TicketDTO> getTickets() {
		return tickets;
	}

	public void setTickets(List<TicketDTO> tickets) {
		this.tickets = tickets;
	}

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", userName=" + userName + ", eMail=" + eMail + ", name=" + name + ", lastName="
				+ lastName + ", role=" + role + "]";
	}

}
