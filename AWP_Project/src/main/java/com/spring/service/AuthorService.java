package com.spring.service;

import java.util.List;
import com.spring.entity.Authors;

public interface AuthorService {
	
	void createAuthor(Authors author);

	void updateAuthor(Authors author);

	void persistAuthor(Authors author);

	void deleteAuthor(Long id);

	Authors getAuthor(Long id);

	List<Authors> getAllAuthors();
}
