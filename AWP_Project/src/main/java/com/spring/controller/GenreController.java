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

import com.spring.entity.Genres;
import com.spring.service.GenreService;

@RestController
public class GenreController {
	
	@Autowired
	private GenreService genreService;
	
	@GetMapping(value = "/genre/list", produces = "application/json")
	public List<Genres> getAllGenres(){
		return this.genreService.getAllGenres();
	}
	
	@PostMapping(value = "/genre/create", produces = "application/json")
	public ResponseEntity<Genres> createGenre(@RequestBody Genres genre){
		this.genreService.createGenre(genre);
		return new ResponseEntity<Genres>(genre, HttpStatus.OK);
	}
	
	@GetMapping(value = "/genre/view/{id}", produces = "application/json")
	public ResponseEntity<Genres> getGenreById(@PathVariable("id") Long id){
		Genres genre = this.genreService.getGenre(id);
		if(genre ==null)
			return new ResponseEntity("No Genre found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Genres>(genre, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/genre/delete/{id}")
	public ResponseEntity deleteGenre(@PathVariable Long id) {		
		Genres genre = this.genreService.getGenre(id);
		if(genre ==null)
			return new ResponseEntity("No Genre found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.genreService.deleteGenre(id);
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/genre/update/{id}")
	public ResponseEntity updateGenre(@PathVariable Long id, @RequestBody Genres genre) {		
		if(this.genreService.getGenre(id) ==null)
			return new ResponseEntity("No Genre found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.genreService.updateGenre(genre);
		return new ResponseEntity(genre, HttpStatus.OK);
	}
}
