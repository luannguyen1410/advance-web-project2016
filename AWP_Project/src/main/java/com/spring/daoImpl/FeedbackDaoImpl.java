package com.spring.daoImpl;

import org.springframework.stereotype.Repository;

import com.spring.dao.FeedbackDao;
import com.spring.entity.Feedbacks;

@Repository
public class FeedbackDaoImpl extends AbstractHibernateDao<Feedbacks, Long>implements FeedbackDao{

}
