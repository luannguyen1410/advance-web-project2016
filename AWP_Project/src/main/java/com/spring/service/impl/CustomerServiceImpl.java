package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.CustomerDao;
import com.spring.entity.Administrators;
import com.spring.entity.Customers;
import com.spring.service.CustomerService;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerDao customerDao;
	
	public CustomerServiceImpl() {
		super();
	}

	@Override
	public void createCustomer(Customers customer) {
		this.customerDao.save(customer);
	}

	@Override
	public void updateCustomer(Customers customer) {
		this.customerDao.update(customer);
	}

	@Override
	public void persistCustomer(Customers customer) {
		this.customerDao.persist(customer);
	}

	@Override
	public void deleteCustomer(Long id) {
		this.customerDao.deleteById(id);
	}

	@Override
	public Customers getCustomer(Long id) {
		return this.customerDao.findById(id);
	}

	@Override
	public List<Customers> getAllCustomers() {
		return this.customerDao.findAll();
	}
	
	@Override
	public Customers loginCustomer(String userName, String password) {
		return this.customerDao.loginCustomer(userName, password);
	}
}
