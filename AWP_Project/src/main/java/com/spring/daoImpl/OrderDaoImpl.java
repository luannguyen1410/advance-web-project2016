package com.spring.daoImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dao.OrderDao;
import com.spring.entity.Orders;
import com.spring.util.HibernateUtil;

@Repository
public class OrderDaoImpl extends AbstractHibernateDao<Orders, Long> implements OrderDao{
	
	@Autowired
    private HibernateUtil hibernateUtil;

    @Override
    public List<Orders> findByCusID(Long id) {
        String jpql = "Select o From Orders o join fetch o.customer c where c.id = :id";
        return (List<Orders>) hibernateUtil.getSession().createQuery(jpql).setParameter("id", id).list();
    }
    
    @Override
    public List<Orders> getAllOrders(){
    	String jpql = "Select o From Orders o";
        return (List<Orders>) hibernateUtil.getSession().createQuery(jpql).list();
    }
}
