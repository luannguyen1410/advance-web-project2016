package com.spring.service;

import java.util.List;

import com.spring.entity.Customers;

public interface CustomerService {
	
	void createCustomer(Customers customer);

	void updateCustomer(Customers customer);

	void persistCustomer(Customers customer);

	void deleteCustomer(Long id);

	Customers getCustomer(Long id);

	List<Customers> getAllCustomers();

	Customers loginCustomer(String userName, String password);
}
