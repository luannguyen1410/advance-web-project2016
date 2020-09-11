package com.spring.dao;

import com.spring.entity.Customers;

public interface CustomerDao extends AbstractDao<Customers, Long>{

	Customers loginCustomer(String userName, String password);

}
