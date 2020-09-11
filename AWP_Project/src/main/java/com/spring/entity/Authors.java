package com.spring.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Author")
public class Authors {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(length = 50, nullable = false)
	private String aut_firstName;
	@Column(length = 50, nullable = false)
	private String aut_lastName;
	@Column(length = 30, unique = true)
	private String aut_phone;
	@Column(length = 100, unique = true)
	private String aut_email;
	@Column(length = 500)
	private String remark;
	
	
	public Authors() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAut_firstName() {
		return aut_firstName;
	}

	public void setAut_firstName(String aut_firstName) {
		this.aut_firstName = aut_firstName;
	}

	public String getAut_lastName() {
		return aut_lastName;
	}

	public void setAut_lastName(String aut_lastName) {
		this.aut_lastName = aut_lastName;
	}

	public String getAut_phone() {
		return aut_phone;
	}

	public void setAut_phone(String aut_phone) {
		this.aut_phone = aut_phone;
	}

	public String getAut_email() {
		return aut_email;
	}

	public void setAut_email(String aut_email) {
		this.aut_email = aut_email;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}	
	
}
