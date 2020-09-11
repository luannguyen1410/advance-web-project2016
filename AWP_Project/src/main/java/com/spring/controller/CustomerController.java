package com.spring.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.entity.Administrators;
import com.spring.entity.Customers;
import com.spring.service.CustomerService;
import com.spring.util.FileUpload;

import request.CustomerRequest;

@RestController
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
    private HttpServletRequest request;
	
	@GetMapping(value = "/customer/list", produces = "application/json")
	public List<Customers> getAllCustomers(){
		return this.customerService.getAllCustomers();
	}
	
	@PostMapping(value = "/customer/create", produces = "application/json")
	public ResponseEntity<Customers> createCustomers(@RequestBody Customers customer){
		this.customerService.createCustomer(customer);
		return new ResponseEntity<Customers>(customer, HttpStatus.OK);
	}
	
	@PostMapping(value = "/customer/create", produces = "application/json", consumes={"application/x-www-form-urlencoded", "multipart/form-data"})
	public ResponseEntity<Customers>  createCustomer(@RequestParam("file") MultipartFile file, 
			@RequestParam("firstName") String firstName, 
			@RequestParam("lastName") String lastName, 
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("gender") boolean gender,
			@RequestParam("dob") Date dob,
			@RequestParam("email") String email,
			@RequestParam("phone") String phone,
			@RequestParam("address") String address,
			@RequestParam("status") Byte status,
			@RequestParam("isActive")Boolean isActive) {
		FileUpload fileUpload = new FileUpload();
		String imageName = fileUpload.process(file,request.getSession().getServletContext().getRealPath("/"));
    	Customers customer = new Customers(firstName, lastName, username, password, gender, dob, email, phone, address, status, imageName, isActive);
		this.customerService.createCustomer(customer);
		return new ResponseEntity<Customers>(customer, HttpStatus.OK);
	}
	
	@GetMapping(value = "/customer/view/{id}", produces = "application/json")
	public ResponseEntity<Customers> getCustomerById(@PathVariable("id") Long id){
		Customers customer = this.customerService.getCustomer(id);
		if(customer ==null)
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Customers>(customer, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/customer/delete/{id}")
	public ResponseEntity deleteCustomer(@PathVariable Long id) {		
		Customers customer = this.customerService.getCustomer(id);
		if(customer ==null)
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.customerService.deleteCustomer(id);		
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/customer/update/{id}")
	public ResponseEntity updateCustomer(@PathVariable Long id, @RequestBody CustomerRequest cust) {		
		if(this.customerService.getCustomer(id) ==null)
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		
		Customers customer = this.customerService.getCustomer(id);
		customer.setPhone(cust.getPhone());
		customer.setAddress(cust.getAddress());
		customer.setStatus(cust.getStatus());
		customer.setIsActive(cust.getIsActive());
		this.customerService.updateCustomer(customer);
		return new ResponseEntity(customer, HttpStatus.OK);
	}
	
	@PostMapping("/customer/login")
	public Customers loginCustomer(@RequestParam("username") String userName, @RequestParam("password") String password) {
		return this.customerService.loginCustomer(userName, password);
	}
}
