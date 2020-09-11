package com.spring.daoImpl;

import org.springframework.stereotype.Repository;

import com.spring.dao.GenreDao;
import com.spring.entity.Genres;

@Repository
public class GenreDaoImpl extends AbstractHibernateDao<Genres, Long>implements GenreDao{

}
