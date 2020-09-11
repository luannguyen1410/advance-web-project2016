package com.spring.daoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dao.CustomerDao;
import com.spring.entity.Administrators;
import com.spring.entity.Customers;
import com.spring.util.HibernateUtil;

@Repository
public class CustomerDaoImpl extends AbstractHibernateDao<Customers, Long>implements CustomerDao{
	
	@Autowired
    private HibernateUtil hibernateUtil;
	
	@Override
	public Customers loginCustomer(String userName, String password){
		String jpql = "Select c From Customers c where c.username = :username and c.password = :password";
		return (Customers) hibernateUtil.getSession().createQuery(jpql).setParameter("username",userName).setParameter("password", password).uniqueResult();		
	}
}
