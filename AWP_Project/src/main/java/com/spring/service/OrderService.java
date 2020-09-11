package com.spring.service;

import java.util.List;

import com.spring.entity.Orders;

public interface OrderService {
	void createOrder(Orders order);

	void updateOrder(Orders order);

	void persistOrder(Orders order);

	void deleteOrder(Long id);

	Orders getOrder(Long id);

	List<Orders> getAllOrders();

	List<Orders> findByCusID(Long id);
}
