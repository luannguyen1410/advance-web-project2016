package com.spring.controller;

import com.spring.entity.Books;
import com.spring.entity.Categories;
import com.spring.entity.Customers;
import com.spring.entity.Order_Details;
import com.spring.entity.Orders;
import com.spring.service.OrderDetailsService;
import com.spring.service.OrderService;

import request.Order;
import request.OrderDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Khoi Vo on 12/20/2016.
 */

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private OrderDetailsService orderDetailService;

    @GetMapping(value = "/order/list", produces = "application/json")
    public List<Orders> listAllOrders() {
        return this.orderService.getAllOrders();
    }
    
    @PostMapping(value = "/order/create", produces = "application/json")
	public ResponseEntity<Orders> createOrder(@RequestBody Order order){
    	
    	SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
		Date purchaseDay = new Date();
		Date shippingDay = null; 
		try {
			shippingDay = formatter.parse(order.getShippingDate());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Orders ord = new Orders(purchaseDay, shippingDay, order.getShippingTime(), order.getShippingAddress(), 
				order.getPhone(), order.getStatus());
		Customers customer = new Customers();
		customer.setId(order.getCust_id());
		ord.setCustomer(customer);
		this.orderService.createOrder(ord);
		if(order.getOrderDetail() != null){
			for (int i = 0; i < order.getOrderDetail().size(); i++) {
				Order_Details ordDetail = new Order_Details();
				
				Books book = new Books();
				book.setId(order.getOrderDetail().get(i).getBoo_id());
				ordDetail.setBook(book);
				
				ordDetail.setOrder(ord);
				
				ordDetail.setCurrentPrice(order.getOrderDetail().get(i).getPrice());
				ordDetail.setQuantity(order.getOrderDetail().get(i).getQuantity());
				System.out.println(ordDetail.getId());
				this.orderDetailService.createOrderDetails(ordDetail);
			}
		}
		else
			System.out.println("list of details is null");
		
		return new ResponseEntity<Orders>(ord, HttpStatus.OK);
		
	}
    
    @GetMapping(value = "/order/view/{id}", produces = "application/json")
    public ResponseEntity<Orders> getOrderById(@PathVariable("id") Long id) {
        Orders order = this.orderService.getOrder(id);
        if (order == null)
            return new ResponseEntity("No Order found for ID " + id, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/order/listByCustomerID/{id}", produces = "application/json")
    public List<Orders> getOrderByCusId(@PathVariable("id") Long id) {
        return this.orderService.findByCusID(id);
    }
    
    @PutMapping(value = "/order/update/{id}", produces = "application/json")
    public ResponseEntity<Orders> updateOrderById(@PathVariable("id") Long id, @RequestBody Orders order){
        if (this.orderService.getOrder(id) == null)
            return new ResponseEntity("No Order found for ID " + id, HttpStatus.NOT_FOUND);
        this.orderService.updateOrder(order);
        return new ResponseEntity(order, HttpStatus.OK);
    }
}
