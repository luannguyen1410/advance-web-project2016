package com.spring.service;

import java.util.List;

import com.spring.entity.Customer_Comments;;

public interface CustomerCommentService {
	
	void createCustomerComment(Customer_Comments customerComment);

	void updateCustomerComment(Customer_Comments customerComment);

	void persistCustomerComment(Customer_Comments customerComment);

	void deleteCustomerComment(Long id);

	Customer_Comments getCustomerComment(Long id);

	List<Customer_Comments> getAllCustomerComments();
}
