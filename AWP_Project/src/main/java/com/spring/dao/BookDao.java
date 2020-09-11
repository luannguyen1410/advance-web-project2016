package com.spring.dao;

import java.util.List;

import com.spring.entity.Books;

public interface BookDao extends AbstractDao<Books, Long>{

	List<Books> findByGenre(Long id);

	List<Books> getListNewBooks();

	List<Books> getListBestSellerBooks();
	
	long getNumberNewBookByPubName(String pubName);

	

}
