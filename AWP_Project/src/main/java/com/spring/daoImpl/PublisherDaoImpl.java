package com.spring.daoImpl;

import org.springframework.stereotype.Repository;

import com.spring.dao.PublisherDao;
import com.spring.entity.Publishers;

@Repository
public class PublisherDaoImpl extends AbstractHibernateDao<Publishers, Long> implements PublisherDao{

}
