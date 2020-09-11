package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.entity.Customer_Comments;
import com.spring.service.CustomerCommentService;

@RestController
public class CustomerCommentController {
	@Autowired
	private CustomerCommentService customerCommentService;
	
	@GetMapping(value = "/customercomment/list", produces = "application/json")
	public List<Customer_Comments> getAllCustomerComments(){
		return this.customerCommentService.getAllCustomerComments();
	}
	
	@PostMapping(value = "/customercomment/create", produces = "application/json")
	public ResponseEntity<Customer_Comments> createAdministrator(@RequestBody Customer_Comments custComment){
		this.customerCommentService.createCustomerComment(custComment);
		return new ResponseEntity<Customer_Comments>(custComment, HttpStatus.OK);
	}
	
	@GetMapping(value = "/customercomment/view/{id}", produces = "application/json")
	public ResponseEntity<Customer_Comments> getCustomerComment(@PathVariable("id") Long id){
		Customer_Comments custComment = this.customerCommentService.getCustomerComment(id);
		if(custComment ==null)
			return new ResponseEntity("No Custommer Comment found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Customer_Comments>(custComment, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/customercomment/delete/{id}")
	public ResponseEntity deleteCustomerComment(@PathVariable Long id) {		
		Customer_Comments custComment = this.customerCommentService.getCustomerComment(id);
		if(custComment ==null)
			return new ResponseEntity("No Custommer Comment found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.customerCommentService.deleteCustomerComment(id);		
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/customercomment/update/{id}")
	public ResponseEntity updateCustomerComment(@PathVariable Long id, @RequestBody Customer_Comments custComment) {		
		if(this.customerCommentService.getCustomerComment(id) ==null)
			return new ResponseEntity("No Custommer Comment found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.customerCommentService.updateCustomerComment(custComment);
		return new ResponseEntity(custComment, HttpStatus.OK);
	}
}
