package com.spring.dao;

import java.util.List;

import com.spring.entity.Order_Details;

public interface OrderDetailDao extends AbstractDao<Order_Details, Long>{

	List<Order_Details> findByOrdID(Long id);

}
