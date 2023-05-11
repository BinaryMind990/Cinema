package com.ftninformatika.jwd.modul3.cinema.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.*;

@Entity
public class Movie {
	
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String name;
    
    @Column
    private int duration;
    
    @Column
    private String distributor;
    
    @Column
    private String country;
    
    @Column
    private int year;
    
    @Column
    private String description;
    
    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Projection> projections = new ArrayList<Projection>();
    
	public Movie() {
		super();
	}

	public Movie(String name, int duration, String distributor, String contry, int year, String description) {
		super();
		this.name = name;
		this.duration = duration;
		this.distributor = distributor;
		this.country = contry;
		this.year = year;
		this.description = description;
	}

	public Movie(Long id, String name, int duration, String distributor, String contry, int year, String description) {
		super();
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.distributor = distributor;
		this.country = contry;
		this.year = year;
		this.description = description;
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

	
	
	public List<Projection> getProjections() {
		return projections;
	}

	public void setProjections(List<Projection> projections) {
		this.projections = projections;
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
		Movie other = (Movie) obj;
		return Objects.equals(country, other.country) && Objects.equals(description, other.description)
				&& Objects.equals(distributor, other.distributor) && duration == other.duration
				&& Objects.equals(id, other.id) && Objects.equals(name, other.name) && year == other.year;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", name=" + name + ", duration=" + duration + ", distributor=" + distributor
				+ ", contry=" + country + ", year=" + year + ", description=" + description + "]";
	}
    
}
