package com.spring.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long ord_id;
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date ord_purchaseDate;
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date ord_shippingDate;
	@Column(length = 30, nullable = false)
	private String shippingTime;
	@Column(length = 200, nullable = false)
	private String shippingAddress;
	@Column(length = 30, nullable = false)
	private String phone;
	@Column(nullable = false)
	private Byte ord_status;
	
	
	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false)
	private Customers customer;
	
	public Orders() {
	}

	
	
	public Orders(Date ord_purchaseDate, Date ord_shippingDate, String shippingTime, String shippingAddress,
			String phone, Byte ord_status) {
		super();
		this.ord_purchaseDate = ord_purchaseDate;
		this.ord_shippingDate = ord_shippingDate;
		this.shippingTime = shippingTime;
		this.shippingAddress = shippingAddress;
		this.phone = phone;
		this.ord_status = ord_status;
	}



	public Long getOrd_id() {
		return ord_id;
	}

	public void setOrd_id(Long ord_id) {
		this.ord_id = ord_id;
	}

	public Date getOrd_purchaseDate() {
		return ord_purchaseDate;
	}

	public void setOrd_purchaseDate(Date ord_purchaseDate) {
		this.ord_purchaseDate = ord_purchaseDate;
	}

	public Date getOrd_shippingDate() {
		return ord_shippingDate;
	}

	public void setOrd_shippingDate(Date ord_shippingDate) {
		this.ord_shippingDate = ord_shippingDate;
	}

	
	public String getShippingTime() {
		return shippingTime;
	}

	public void setShippingTime(String shippingTime) {
		this.shippingTime = shippingTime;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public Byte getOrd_status() {
		return ord_status;
	}

	public void setOrd_status(Byte ord_status) {
		this.ord_status = ord_status;
	}
	

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}



	public Customers getCustomer() {
		return customer;
	}



	public void setCustomer(Customers customer) {
		this.customer = customer;
	}	
	
	
}
