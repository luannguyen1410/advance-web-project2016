package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.entity.Authors;
import com.spring.service.AuthorService;

@RestController
public class AuthorController {
	
	@Autowired
	private AuthorService authorService;
	
	@GetMapping(value = "/author/list", produces = "application/json")
	public List<Authors> getAllAuthors(){
		return this.authorService.getAllAuthors();
	}
	
	@PostMapping(value = "/author/create", produces = "application/json")
	public ResponseEntity<Authors> createAuthor(@RequestBody Authors author){
		this.authorService.createAuthor(author);
		return new ResponseEntity<Authors>(author, HttpStatus.OK);
	}
	
	@GetMapping(value = "/author/view/{id}", produces = "application/json")
	public ResponseEntity<Authors> getAuthorById(@PathVariable("id") Long id){
		Authors author = this.authorService.getAuthor(id);
		if(author ==null)
			return new ResponseEntity("No Author found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Authors>(author, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/author/delete/{id}")
	public ResponseEntity deleteAuthor(@PathVariable Long id) {		
		Authors author = this.authorService.getAuthor(id);
		if(author ==null)
			return new ResponseEntity("No Author found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.authorService.deleteAuthor(id);
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/author/update/{id}")
	public ResponseEntity updateAuthor(@PathVariable Long id, @RequestBody Authors author) {		
		if(this.authorService.getAuthor(id) ==null)
			return new ResponseEntity("No Author found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.authorService.updateAuthor(author);
		return new ResponseEntity(author, HttpStatus.OK);
	}
}
