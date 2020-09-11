package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.GenreDao;
import com.spring.entity.Genres;
import com.spring.service.GenreService;

@Service
@Transactional
public class GenreServiceImpl implements GenreService{

	@Autowired
	private GenreDao genreDao;
	
	@Override
	public void createGenre(Genres genre) {
		this.genreDao.save(genre);
	}

	@Override
	public void updateGenre(Genres genre) {
		this.genreDao.update(genre);
	}

	@Override
	public void persistGenre(Genres genre) {
		this.genreDao.persist(genre);
	}

	@Override
	public void deleteGenre(Long id) {
		this.genreDao.deleteById(id);
	}

	@Override
	public Genres getGenre(Long id) {
		return this.genreDao.findById(id);
	}

	@Override
	public List<Genres> getAllGenres() {
		return this.genreDao.findAll();
	}

}
