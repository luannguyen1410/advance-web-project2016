package com.spring.service;

import java.util.List;
import com.spring.entity.Categories;

public interface CategoryService {
	
	void createCategory(Categories category);

	void updateCategory(Categories category);

	void persistCategory(Categories category);

	void deleteCategory(Long id);

	Categories getCategory(Long id);

	List<Categories> getAllCategories();

	List<Categories> getAllCategoriesOnlyIdName();
}
