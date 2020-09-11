package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.entity.Order_Details;
import com.spring.service.OrderDetailsService;

@RestController
public class OrderDetailsController {
	
	@Autowired
	private OrderDetailsService orderDetailService;
	
	
	@PostMapping(value = "/orderdetail/create", produces = "application/json")
	public ResponseEntity<Order_Details> createOrderDetail(@RequestBody Order_Details orderDetail){
		this.orderDetailService.createOrderDetails(orderDetail);
		return new ResponseEntity<Order_Details>(orderDetail, HttpStatus.OK);
	}
	
	@GetMapping(value = "/orderdetail/view/{id}", produces = "application/json")
	public List<Order_Details> getDetailsByOrdId(@PathVariable("id") Long id){
		return this.orderDetailService.getAllOrderDetailsByOrdID(id);
	}
	
}
