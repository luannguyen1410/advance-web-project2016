package com.spring.daoImpl;

import org.springframework.stereotype.Repository;
import com.spring.dao.AuthorDao;
import com.spring.entity.Authors;

@Repository
public class AuthorDaoImpl extends AbstractHibernateDao<Authors, Long> implements AuthorDao{

}
