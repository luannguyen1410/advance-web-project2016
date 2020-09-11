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

import com.spring.entity.Publishers;
import com.spring.service.PublisherService;

@RestController
public class PublisherController {
	
	@Autowired
	private PublisherService publisherService;
	
	@GetMapping(value = "/publisher/list", produces = "application/json")
	public List<Publishers> getAllPublishers(){
		return this.publisherService.getAllPublishers();
	}
	
	@PostMapping(value = "/publisher/create", produces = "application/json")
	public ResponseEntity<Publishers> createPublisher(@RequestBody Publishers publisher){
		this.publisherService.createPublisher(publisher);
		return new ResponseEntity<Publishers>(publisher, HttpStatus.OK);
	}
	
	@GetMapping(value = "/publisher/view/{id}", produces = "application/json")
	public ResponseEntity<Publishers> getPublisherById(@PathVariable("id") Long id){
		Publishers publisher = this.publisherService.getPublisher(id);
		if(publisher ==null)
			return new ResponseEntity("No Publisher found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Publishers>(publisher, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/publisher/delete/{id}")
	public ResponseEntity deletePublisher(@PathVariable Long id) {		
		Publishers publisher = this.publisherService.getPublisher(id);
		if(publisher ==null)
			return new ResponseEntity("No Publisher found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.publisherService.deletePublisher(id);
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/publisher/update/{id}")
	public ResponseEntity updateAdministrator(@PathVariable Long id, @RequestBody Publishers publisher) {		
		if(this.publisherService.getPublisher(id) ==null)
			return new ResponseEntity("No Publisher found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.publisherService.updatePublisher(publisher);
		return new ResponseEntity(publisher, HttpStatus.OK);
	}
}
