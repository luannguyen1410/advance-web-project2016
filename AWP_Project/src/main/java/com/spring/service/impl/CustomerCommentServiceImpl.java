package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.CustomerCommentDao;
import com.spring.entity.Customer_Comments;
import com.spring.service.CustomerCommentService;

@Service
@Transactional
public class CustomerCommentServiceImpl implements CustomerCommentService{

	@Autowired
	private CustomerCommentDao customerCommentDao;
	
	@Override
	public void createCustomerComment(Customer_Comments customerComment) {
		this.customerCommentDao.save(customerComment);
	}

	@Override
	public void updateCustomerComment(Customer_Comments customerComment) {
		this.customerCommentDao.update(customerComment);
	}

	@Override
	public void persistCustomerComment(Customer_Comments customerComment) {
		this.customerCommentDao.persist(customerComment);
	}

	@Override
	public void deleteCustomerComment(Long id) {
		this.customerCommentDao.deleteById(id);
	}

	@Override
	public Customer_Comments getCustomerComment(Long id) {
		return this.customerCommentDao.findById(id);
	}

	@Override
	public List<Customer_Comments> getAllCustomerComments() {
		return this.customerCommentDao.findAll();
	}

}
