package com.spring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.dao.BookDao;
import com.spring.entity.Books;
import com.spring.service.BookService;

@Service
@Transactional
public class BookServiceImpl implements BookService {

	@Autowired
	private BookDao bookDao;

	public BookServiceImpl() {
		super();
	}

	@Override
	public void createBook(Books book) {
		this.bookDao.save(book);

	}

	@Override
	public void updateBook(Books book) {
		this.bookDao.update(book);
	}

	@Override
	public void persistBook(Books book) {
		this.bookDao.persist(book);
	}

	@Override
	public void deleteBook(Long id) {
		this.bookDao.deleteById(id);
	}

	@Override
	public Books getBook(Long id) {
		return this.bookDao.findById(id);
	}

	@Override
	public List<Books> getAllBooks() {
		return this.bookDao.findAll();
	}
	
	@Override
	public List<Books> getAllBooksByGenreID(long id) {
		return this.bookDao.findByGenre(id);
	}
	
	@Override
	public List<Books> getListNewBooks() {
		return this.bookDao.getListNewBooks();	
	}
	
	@Override
	public List<Books> getListBestSellerBooks() {
		return this.bookDao.getListBestSellerBooks();	
	}
	
	@Override
	public long getNumberNewBookByPubName(String pubName) {
		return this.bookDao.getNumberNewBookByPubName(pubName);
	}
}
