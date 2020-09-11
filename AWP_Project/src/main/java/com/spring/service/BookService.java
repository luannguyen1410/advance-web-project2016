package com.spring.service;

import java.util.List;
import com.spring.entity.Books;

public interface BookService {
	
	void createBook(Books book);

	void updateBook(Books book);

	void persistBook(Books book);

	void deleteBook(Long id);

	Books getBook(Long id);

	List<Books> getAllBooks();

	long getNumberNewBookByPubName(String pubName);

	List<Books> getAllBooksByGenreID(long id);

	List<Books> getListNewBooks();

	List<Books> getListBestSellerBooks();

}
