package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.OrderDao;
import com.spring.entity.Orders;
import com.spring.service.OrderService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderDao orderDao;
	
	@Override
	public void createOrder(Orders order) {
		this.orderDao.save(order);
	}

	@Override
	public void updateOrder(Orders order) {
		this.orderDao.update(order);
	}

	@Override
	public void persistOrder(Orders order) {
		this.orderDao.persist(order);
	}

	@Override
	public void deleteOrder(Long id) {
		this.orderDao.deleteById(id);
	}

	@Override
	public Orders getOrder(Long id) {
		return this.orderDao.findById(id);
	}

	@Override
	public List<Orders> getAllOrders() {
		return this.orderDao.getAllOrders();
	}
	
	@Override
    public List<Orders> findByCusID(Long id) {
        return this.orderDao.findByCusID(id);
    }
}
