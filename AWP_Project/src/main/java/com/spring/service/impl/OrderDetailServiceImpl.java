package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dao.LanguageDao;
import com.spring.dao.OrderDetailDao;
import com.spring.entity.Order_Details;
import com.spring.service.OrderDetailsService;

@Service
@Transactional
public class OrderDetailServiceImpl implements OrderDetailsService{

	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Override
	public void createOrderDetails(Order_Details ord_details) {
		this.orderDetailDao.save(ord_details);
	}

	@Override
	public void updateOrderDetails(Order_Details ord_details) {
		this.orderDetailDao.update(ord_details);
	}

	@Override
	public void persistOrderDetails(Order_Details ord_details) {
		this.orderDetailDao.persist(ord_details);
	}

	@Override
	public void deleteOrderDetails(Long id) {
		this.orderDetailDao.deleteById(id);
	}


	@Override
	public List<Order_Details> getAllOrderDetailsByOrdID(Long id) {
		return this.orderDetailDao.findByOrdID(id);
	}

}
