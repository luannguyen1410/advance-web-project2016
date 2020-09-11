package com.spring.dao;

import java.util.List;

import com.spring.entity.Orders;

public interface OrderDao extends AbstractDao<Orders, Long>{

	List<Orders> findByCusID(Long id);

	List<Orders> getAllOrders();

}
