package com.cinema.web.dto;

import java.util.Objects;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import org.springframework.stereotype.Component;

@Component
public class MovieDTO {

	private Long id;

	@NotNull
	@NotBlank
	private String name;

	@NotNull
	@Positive
	@Max(value = 600)
	private int duration;

	@NotNull
	@NotBlank
	private String distributor;

	@NotNull
	@NotBlank
	private String country;

	@NotNull
	@Min(value = 1888)
	@Max(value = 2100)
	private int year;

	@NotNull
	@NotBlank
	private String description;

	@NotNull
	@NotBlank
	@Pattern(regexp = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", message = "Link is not valid")
	private String posterLink;
	
	@NotNull
	@NotBlank
	@Pattern(regexp = "^https:\\/\\/www.imdb.com\\/title\\/[a-zA-Z0-9()]{1,15}.*", message = "Link is not valid imdb link")
	private String imdbLink;
	
	private int version;
	
	@NotNull
	@NotBlank
	private String director;

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

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
	

	public String getImdbLink() {
		return imdbLink;
	}

	public void setImdbLink(String imdbLink) {
		this.imdbLink = imdbLink;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	@Override
	public String toString() {
		return "MovieDTO [id=" + id + ", name=" + name + ", duration=" + duration + ", distributor=" + distributor
				+ ", country=" + country + ", year=" + year + ", description=" + description + "]";
	}

}
