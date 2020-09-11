package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.CategoryDao;
import com.spring.entity.Categories;
import com.spring.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryDao categoryDao;
	
	public CategoryServiceImpl() {
		super();
	}

	@Override
	public void createCategory(Categories category) {
		this.categoryDao.save(category);
	}

	@Override
	public void updateCategory(Categories category) {
		this.categoryDao.update(category);
	}

	@Override
	public void persistCategory(Categories category) {
		this.categoryDao.persist(category);
	}

	@Override
	public void deleteCategory(Long id) {
		this.categoryDao.deleteById(id);
	}

	@Override
	public Categories getCategory(Long id) {
		return this.categoryDao.findById(id);
	}

	@Override
	public List<Categories> getAllCategories() {
		return this.categoryDao.findAll();
	}
	
	@Override
	public List<Categories> getAllCategoriesOnlyIdName(){
		return this.categoryDao.getAllCategoryOnlyIdName();
	}
}
