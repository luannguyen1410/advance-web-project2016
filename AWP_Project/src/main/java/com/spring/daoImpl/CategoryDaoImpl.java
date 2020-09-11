package com.spring.daoImpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dao.CategoryDao;
import com.spring.entity.Categories;
import com.spring.util.HibernateUtil;

@Repository
public class CategoryDaoImpl extends AbstractHibernateDao<Categories, Long> implements CategoryDao{
	
	@Autowired
    private HibernateUtil hibernateUtil;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Categories> getAllCategoryOnlyIdName() {
		String jpql =" select c from Categories c";
		Query query = getSession().createQuery(jpql);
		return query.list();

	}
}
