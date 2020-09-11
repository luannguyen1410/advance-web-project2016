package com.spring.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Administrator")
public class Administrators {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long adm_id;
	@Column(length = 50, nullable = false)
	private String adm_firstName;
	@Column(length = 50, nullable = false)
	private String adm_lastName;
	@Column(length = 32, nullable = false, unique = true, updatable = false)
	private String adm_username;
	@Column(length = 32, nullable = false)
	private String adm_password;
	@Column(length = 100, nullable = false, unique = true)
	private String adm_email;
	@Column(length = 200)
	private String adm_address;
	@Column(length = 30, nullable = false)
	private String adm_phone;
	@Column(nullable = false)
	private Boolean adm_isActive;
	@Column(length = 100)
	private String adm_image;

	public Administrators(String adm_firstName, String adm_lastName, String adm_username, String adm_password,
			String adm_email, String adm_address, String adm_phone, Boolean adm_isActive, String adm_image) {
		super();
		this.adm_firstName = adm_firstName;
		this.adm_lastName = adm_lastName;
		this.adm_username = adm_username;
		this.adm_password = adm_password;
		this.adm_email = adm_email;
		this.adm_address = adm_address;
		this.adm_phone = adm_phone;
		this.adm_isActive = adm_isActive;
		this.adm_image = adm_image;
	}
	
	public Administrators(String adm_firstName, String adm_lastName, String adm_email, String adm_address, String adm_phone, Boolean adm_isActive) {
		super();
		this.adm_firstName = adm_firstName;
		this.adm_lastName = adm_lastName;
		this.adm_email = adm_email;
		this.adm_address = adm_address;
		this.adm_phone = adm_phone;
		this.adm_isActive = adm_isActive;
	}

	public Administrators() {
	}

	public Long getAdm_id() {
		return adm_id;
	}

	public void setAdm_id(Long adm_id) {
		this.adm_id = adm_id;
	}

	public String getAdm_firstName() {
		return adm_firstName;
	}

	public void setAdm_firstName(String adm_firstName) {
		this.adm_firstName = adm_firstName;
	}

	public String getAdm_lastName() {
		return adm_lastName;
	}

	public void setAdm_lastName(String adm_lastName) {
		this.adm_lastName = adm_lastName;
	}

	public String getAdm_username() {
		return adm_username;
	}

	public void setAdm_username(String adm_username) {
		this.adm_username = adm_username;
	}

	public String getAdm_password() {
		return adm_password;
	}

	public void setAdm_password(String adm_password) {
		this.adm_password = adm_password;
	}

	public String getAdm_email() {
		return adm_email;
	}

	public void setAdm_email(String adm_email) {
		this.adm_email = adm_email;
	}

	public String getAdm_address() {
		return adm_address;
	}

	public void setAdm_address(String adm_address) {
		this.adm_address = adm_address;
	}

	public String getAdm_phone() {
		return adm_phone;
	}

	public void setAdm_phone(String adm_phone) {
		this.adm_phone = adm_phone;
	}

	public Boolean getAdm_isActive() {
		return adm_isActive;
	}

	public void setAdm_isActive(Boolean adm_isActive) {
		this.adm_isActive = adm_isActive;
	}

	public String getAdm_image() {
		return adm_image;
	}

	public void setAdm_image(String adm_image) {
		this.adm_image = adm_image;
	}
}