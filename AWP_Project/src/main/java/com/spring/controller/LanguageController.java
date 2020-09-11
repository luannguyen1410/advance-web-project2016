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

import com.spring.entity.Languages;
import com.spring.service.LanguageService;

@RestController
public class LanguageController {
	
	@Autowired
	private LanguageService languageService;
	
	@GetMapping(value = "/language/list", produces = "application/json")
	public List<Languages> getAllLanguages(){
		return this.languageService.getAllLanguages();
	}
	
	@PostMapping(value = "/language/create", produces = "application/json")
	public ResponseEntity<Languages> createLanguage(@RequestBody Languages language){
		this.languageService.createLanguage(language);
		return new ResponseEntity<Languages>(language, HttpStatus.OK);
	}
	
	@GetMapping(value = "/language/view/{id}", produces = "application/json")
	public ResponseEntity<Languages> getLanguageById(@PathVariable("id") Long id){
		Languages language = this.languageService.getLanguage(id);
		if(language ==null)
			return new ResponseEntity("No Language found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Languages>(language, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/language/delete/{id}")
	public ResponseEntity deleteAdministrator(@PathVariable Long id) {		
		Languages language = this.languageService.getLanguage(id);
		if(language ==null)
			return new ResponseEntity("No Language found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.languageService.deleteLanguage(id);		
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/language/update/{id}")
	public ResponseEntity updateAdministrator(@PathVariable Long id, @RequestBody Languages language) {		
		if(this.languageService.getLanguage(id) ==null)
			return new ResponseEntity("No Language found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.languageService.updateLanguage(language);
		return new ResponseEntity(language, HttpStatus.OK);
	}
}
