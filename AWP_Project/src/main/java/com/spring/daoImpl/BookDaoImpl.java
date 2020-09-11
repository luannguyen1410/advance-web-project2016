package com.spring.daoImpl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.dao.BookDao;
import com.spring.entity.Books;
import com.spring.util.HibernateUtil;

@Repository
public class BookDaoImpl extends AbstractHibernateDao<Books, Long> implements BookDao{
	
	@Autowired
    private HibernateUtil hibernateUtil;
	
	@Override
	public List<Books> findByGenre(Long id){
		String jpql = "Select b From Books b join fetch b.genre g where g.id = :id order by b.importedDate desc";
		return (List<Books>) hibernateUtil.getSession().createQuery(jpql).setParameter("id", id).list();
	}
	
	@Override
	public List<Books> getListNewBooks(){
		String jpql = "Select b from Books b where b.status = 1 order by b.publishingDate desc";
		return (List<Books>) hibernateUtil.getSession().createQuery(jpql).setMaxResults(10).list();
	}
	
	@Override
	public List<Books> getListBestSellerBooks(){
		String jpql = "Select b from Books b where b.status = 3 order by b.publishingDate desc";
		return (List<Books>) hibernateUtil.getSession().createQuery(jpql).setMaxResults(5).list();
	}

	
	@Override
	public long getNumberNewBookByPubName(String pubName){
		String jpql = "Select Count(b) from Books b join b.publisher p where p.publisherName = :pub_Name and b.status = 1 order by b.publishingDate desc";
		return (long) hibernateUtil.getSession().createQuery(jpql).setParameter("pub_Name", pubName).uniqueResult();
	}
}
