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

import com.spring.entity.Books;
import com.spring.entity.Categories;
import com.spring.service.BookService;
import com.spring.service.CategoryService;

@RestController
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@GetMapping(value = "/category/list", produces = "application/json")
	public List<Categories> getAllCategories(){
		return this.categoryService.getAllCategories();
	}
	
	@GetMapping(value = "/category/listName", produces = "application/json")
	public List<Categories> getAllCategoriesOnlyIdName(){
		return this.categoryService.getAllCategoriesOnlyIdName();
	}
	
	@PostMapping(value = "/category/create", produces = "application/json")
	public ResponseEntity<Categories> createCategory(@RequestBody Categories category){
		this.categoryService.createCategory(category);
		return new ResponseEntity<Categories>(category, HttpStatus.OK);
	}
	
	@GetMapping(value = "/category/view/{id}", produces = "application/json")
	public ResponseEntity<Categories> getCategoryById(@PathVariable("id") Long id){
		Categories category = this.categoryService.getCategory(id);
		if(category ==null)
			return new ResponseEntity("No Category found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Categories>(category, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/category/delete/{id}")
	public ResponseEntity deleteCategory(@PathVariable Long id) {		
		Categories category = this.categoryService.getCategory(id);
		if(category ==null)
			return new ResponseEntity("No Category found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.categoryService.deleteCategory(id);
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/category/update/{id}")
	public ResponseEntity updateCategory(@PathVariable Long id, @RequestBody Categories category) {		
		if(this.categoryService.getCategory(id) ==null)
			return new ResponseEntity("No Category found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.categoryService.updateCategory(category);
		return new ResponseEntity(category, HttpStatus.OK);
	}
}
