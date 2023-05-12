package com.ftninformatika.jwd.modul3.cinema.web.dto;

import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.springframework.stereotype.Component;

@Component
public class MovieDTO {

	
    private Long id;

	@NotBlank
    private String name;
    
	@Positive
    private int duration;
    
    private String distributor;
    
    private String country;
    
    @Positive
    private int year;
    
    private String description;
    
    private String posterLink;

	public MovieDTO() {
		super();
	}

	public MovieDTO(@NotBlank String name, @Positive int duration, String distributor, String country,
			@Positive int year, String description, String posterLink) {
		super();
		this.name = name;
		this.duration = duration;
		this.distributor = distributor;
		this.country = country;
		this.year = year;
		this.description = description;
		this.posterLink = posterLink;
	}

	public MovieDTO(Long id, @NotBlank String name, @Positive int duration, String distributor, String country,
			@Positive int year, String description, String posterLink) {
		super();
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.distributor = distributor;
		this.country = country;
		this.year = year;
		this.description = description;
		this.posterLink = posterLink;
	}


	@Override
	public int hashCode() {
		return Objects.hash(country, description, distributor, duration, id, name, year);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MovieDTO other = (MovieDTO) obj;
		return Objects.equals(country, other.country) && Objects.equals(description, other.description)
				&& Objects.equals(distributor, other.distributor) && duration == other.duration
				&& Objects.equals(id, other.id) && Objects.equals(name, other.name) && year == other.year;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getDistributor() {
		return distributor;
	}

	public void setDistributor(String distributor) {
		this.distributor = distributor;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	

	public String getPosterLink() {
		return posterLink;
	}

	public void setPosterLink(String posterLink) {
		this.posterLink = posterLink;
	}

	@Override
	public String toString() {
		return "MovieDTO [id=" + id + ", name=" + name + ", duration=" + duration + ", distributor=" + distributor
				+ ", country=" + country + ", year=" + year + ", description=" + description + "]";
	}    

}
