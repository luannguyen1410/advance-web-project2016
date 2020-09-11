package com.spring.service.impl;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dao.AuthorDao;
import com.spring.entity.Authors;
import com.spring.service.AuthorService;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService{
	
	@Autowired
	private AuthorDao authorDao;
	
	public AuthorServiceImpl() {
		super();
	}

	@Override
	public void createAuthor(Authors author) {
		this.authorDao.save(author);
	}

	@Override
	public void updateAuthor(Authors author) {
		this.authorDao.update(author);
	}

	@Override
	public void persistAuthor(Authors author) {
		this.authorDao.persist(author);
	}

	@Override
	public void deleteAuthor(Long id) {
		this.authorDao.deleteById(id);
	}

	@Override
	public Authors getAuthor(Long id) {
		return this.authorDao.findById(id);
	}

	@Override
	public List<Authors> getAllAuthors() {
		return this.authorDao.findAll();
	}
}
