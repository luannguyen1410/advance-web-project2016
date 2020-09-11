package com.spring.service;

import java.util.List;

import com.spring.entity.Order_Details;

public interface OrderDetailsService {
	
	void createOrderDetails(Order_Details ord_details);

	void updateOrderDetails(Order_Details ord_details);

	void persistOrderDetails(Order_Details ord_details);

	void deleteOrderDetails(Long id);

	List<Order_Details> getAllOrderDetailsByOrdID(Long id);
}
