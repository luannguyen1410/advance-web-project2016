package com.spring.daoImpl;

import java.io.Serializable;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import com.spring.dao.AbstractDao;

import java.lang.reflect.ParameterizedType;
import java.util.List;

public class AbstractHibernateDao<M, ID extends Serializable> implements AbstractDao<M, ID>{
	protected Class<M> persistentClass;

//	@Autowired
//	protected HibernateTemplate hibernateTemplate; 
	
    @Autowired
	protected SessionFactory sessionFactory;
	@SuppressWarnings("unchecked")
	public AbstractHibernateDao() {
		persistentClass = (Class<M>)((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	@Override
	@SuppressWarnings("unchecked")
	public M findById(final ID id) throws DataAccessException {            
		return (M)getSession().get(persistentClass, id);
	}
	
	@Override
	public void persist(final M... models) throws DataAccessException {
		for(M each : models) {                                 
			getSession().saveOrUpdate(each);
		}
	}
	@Override
	public void update(final M...models) throws DataAccessException{
		for(M each: models){
			getSession().update(each);
		}
	}
	
	@Override
	public void save(final M...models) throws DataAccessException{
		for(M each: models){
			getSession().save(each);
		}
	}
	
    @Override
	public void deleteById(final ID... ids) throws DataAccessException {
		for(ID each : ids) {
                                   
			getSession().delete(findById(each));
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<M> findAll() {
		return (List<M>)getSession().createQuery(" FROM "+persistentClass.getSimpleName()).list();
		//return (List<M>) hibernateTemplate.find("FROM " + persistentClass.getSimpleName());
		
	}
	
	protected Session getSession(){
    	Session session = null;
    	try 
    	{
    	    //Step-2: Implementation
    	    session = sessionFactory.getCurrentSession();
    	} 
    	catch (HibernateException e) 
    	{
    	    //Step-3: Implementation
    	    session = sessionFactory.openSession();
    	}
    	return session;
    }
	
	protected DetachedCriteria getDetachedCriteria() {
		return DetachedCriteria.forClass(persistentClass);
	}
	
	
	protected Criteria createCriteria() {
		return getSession().createCriteria(persistentClass);
	}
	
	@Override
	public Integer countAll() {
		return (Integer) this.createCriteria().setProjection(
				Projections.rowCount()).uniqueResult();
	}
}
