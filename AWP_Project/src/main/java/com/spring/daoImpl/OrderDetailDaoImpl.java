
package com.spring.daoImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dao.OrderDetailDao;
import com.spring.entity.Order_Details;
import com.spring.util.HibernateUtil;

@Repository
public class OrderDetailDaoImpl extends AbstractHibernateDao<Order_Details, Long> implements OrderDetailDao{
	
	@Autowired
    private HibernateUtil hibernateUtil;
	
	@Override
    public List<Order_Details> findByOrdID(Long id) {
        //String jpql = "Select o From Order_Details o where o.primaryKey.ord_id = :id";
    	String jpql = "Select o From Order_Details o where o.order.ord_id = :id";
    	 return (List<Order_Details>) hibernateUtil.getSession().createQuery(jpql).setParameter("id", id).list();
       // return (List<Order_Details>) hibernateUtil.getSession().createQuery(jpql).setParameter("id", id).list();
    }
}
