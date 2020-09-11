package com.spring.service;

import java.util.List;

import com.spring.entity.Genres;

public interface GenreService {
	
	void createGenre(Genres genre);

	void updateGenre(Genres genre);

	void persistGenre(Genres genre);

	void deleteGenre(Long id);

	Genres getGenre(Long id);

	List<Genres> getAllGenres();
}
