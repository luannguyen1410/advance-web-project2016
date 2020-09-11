package com.spring.daoImpl;

import org.springframework.stereotype.Repository;

import com.spring.dao.CustomerCommentDao;
import com.spring.entity.Customer_Comments;

@Repository
public class CustomerCommentDaoImpl extends AbstractHibernateDao<Customer_Comments, Long> implements CustomerCommentDao{

}
