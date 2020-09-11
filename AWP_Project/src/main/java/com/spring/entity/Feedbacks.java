package com.spring.entity;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Feedback")
public class Feedbacks {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long fee_id;
	@Column(length = 100, nullable =false)
	private String fee_cusName;
	@Column(length = 100, nullable =false, unique = true)
	private String fee_email;
	@Column(length = 50)
	private String fee_subject;
	@Column(length = 500, nullable =false)
	private String fee_message;
	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.DATE)
	private Date fee_createdDate;
	@Column(nullable = false)
	private Byte status;
	
	
	
	public Feedbacks() {
	}

	public Long getFee_id() {
		return fee_id;
	}

	public void setFee_id(Long fee_id) {
		this.fee_id = fee_id;
	}

	public String getFee_cusName() {
		return fee_cusName;
	}

	public void setFee_cusName(String fee_cusName) {
		this.fee_cusName = fee_cusName;
	}

	public String getFee_email() {
		return fee_email;
	}

	public void setFee_email(String fee_email) {
		this.fee_email = fee_email;
	}

	public String getFee_subject() {
		return fee_subject;
	}

	public void setFee_subject(String fee_subject) {
		this.fee_subject = fee_subject;
	}

	public String getFee_message() {
		return fee_message;
	}

	public void setFee_message(String fee_message) {
		this.fee_message = fee_message;
	}

	public Date getFee_createdDate() {
		return fee_createdDate;
	}

	public void setFee_createdDate(Date fee_createdDate) {
		this.fee_createdDate = fee_createdDate;
	}

	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}

	
}