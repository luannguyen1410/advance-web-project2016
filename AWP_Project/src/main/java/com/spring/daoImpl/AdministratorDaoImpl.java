package com.spring.daoImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dao.AdministratorDao;
import com.spring.entity.Administrators;
import com.spring.util.HibernateUtil;

@Repository
public class AdministratorDaoImpl extends AbstractHibernateDao<Administrators, Long> implements AdministratorDao{
	
	@Autowired
    private HibernateUtil hibernateUtil;
	
	@Override
	public Administrators loginAdmin(String userName, String password){
		String jpql = "Select a From Administrators a where a.adm_username = :username and a.adm_password = :password";
		return (Administrators) hibernateUtil.getSession().createQuery(jpql).setParameter("username",userName).setParameter("password", password).uniqueResult();
		
	}
}
