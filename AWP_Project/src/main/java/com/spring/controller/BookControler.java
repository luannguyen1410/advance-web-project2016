package com.spring.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.entity.Administrators;
import com.spring.entity.Categories;
import com.spring.entity.Genres;
import com.spring.entity.Languages;
import com.spring.entity.Publishers;
import com.spring.entity.Authors;
import com.spring.entity.Books;
import com.spring.service.BookService;
import com.spring.util.FileUpload;

import request.BookRequest;

@RestController
public class BookControler {
	
	@Autowired
	private BookService bookService;
	
	@Autowired
    private HttpServletRequest request;
	
	@GetMapping(value = "/book/list", produces = "application/json")
	public List<Books> getAllBooks(){
		return this.bookService.getAllBooks();
	}
	
	@GetMapping(value = "/book/listByGenre/{id}", produces = "application/json")
	public List<Books> getListNewBookByPubName(@PathVariable long id){
		return this.bookService.getAllBooksByGenreID(id);
	}
	
	@GetMapping(value = "/book/listNew", produces = "application/json")
	public List<Books> getListNewBook(){
		return this.bookService.getListNewBooks();
	}
	
	@GetMapping(value = "/book/listBestSeller", produces = "application/json")
	public List<Books> getListBestSellerBook(){
		return this.bookService.getListBestSellerBooks();
	}
	
	@PostMapping(value = "/book/create", produces = "application/json")
	public ResponseEntity<Books> createBook(@RequestBody Books book){
		this.bookService.createBook(book);
		return new ResponseEntity<Books>(book, HttpStatus.OK);
	}
	
	@PostMapping(value = "/book/create", produces = "application/json", consumes={"application/x-www-form-urlencoded", "multipart/form-data"})
	public ResponseEntity<Books>  createBook(@RequestParam("file") MultipartFile file, 
			@RequestParam("isbn") String isbn, 
			@RequestParam("title") String title, 
			@RequestParam("publishingDate") String  publishingDate,
			@RequestParam("importedDate") String importedDate,
			@RequestParam("status") Byte status,
			@RequestParam("description") String description, 
			@RequestParam("quantity") int quantity,
			@RequestParam("retailPrice") double retailPrice,
			@RequestParam("salePrice") double salePrice,
			@RequestParam("isActive") boolean isActive,
			@RequestParam("category") long cat_id,
			@RequestParam("publisher") long pub_id,
			@RequestParam("genre") long gen_id,
			@RequestParam("language") long lan_id,
			@RequestParam("author") long aut_id) {
		
		FileUpload fileUpload = new FileUpload();
		String imageName = fileUpload.process(file,request.getSession().getServletContext().getRealPath("/"));

		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");
		Date importedDay = null;
		Date publishingDay = null; 
		try {
			importedDay = formatter.parse(importedDate);
			publishingDay = formatter.parse(publishingDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		Books book = new Books(isbn, title, publishingDay, importedDay, description, status, quantity, retailPrice, salePrice, isActive, imageName);
		Categories category = new Categories(cat_id);
		book.setCategory(category);
		Genres genre = new Genres(gen_id);
		book.setGenre(genre);
		Languages lang = new Languages(lan_id);
		book.setLanguage(lang);
		Publishers publisher = new Publishers(pub_id);
		book.setPublisher(publisher);
		Authors author = new Authors();
		author.setId(aut_id);
		book.setAuthor(author);
		this.bookService.createBook(book);
		return new ResponseEntity<Books>(book, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/book/view/{id}", produces = "application/json")
	public ResponseEntity<Books> getBookById(@PathVariable("id") Long id){
		Books book = this.bookService.getBook(id);
		if(book ==null)
			return new ResponseEntity("No Book found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Books>(book, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/book/delete/{id}")
	public ResponseEntity deleteBook(@PathVariable Long id) {		
		Books book = this.bookService.getBook(id);
		if(book ==null)
			return new ResponseEntity("No Book found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.bookService.deleteBook(id);		
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/book/update/{id}")
	public ResponseEntity updateBook(@PathVariable Long id, @RequestBody BookRequest bookRequest) {	
		
		if(this.bookService.getBook(id) ==null)
			return new ResponseEntity("No Book found for ID " + id, HttpStatus.NOT_FOUND);
		Books book = this.bookService.getBook(id);
		book.setStatus(bookRequest.getStatus());
		book.setRetailPrice(bookRequest.getRetailPrice());
		book.setSalePrice(bookRequest.getSalePrice());
		book.setQuantity(bookRequest.getQuantity());
		book.setIsActive(bookRequest.getIsActive());
		this.bookService.updateBook(book);
		return new ResponseEntity(book, HttpStatus.OK);
	}
}
