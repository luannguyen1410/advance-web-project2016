package com.spring.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.dao.DataAccessException;

import com.spring.entity.Categories;

public interface AbstractDao<M, ID extends Serializable> {

	M findById(ID id) throws DataAccessException;

	void persist(M... models) throws DataAccessException;

	void deleteById(ID... ids) throws DataAccessException;

	List<M> findAll();

	Integer countAll();

	void update(M... models) throws DataAccessException;

	void save(M... models) throws DataAccessException;

}
