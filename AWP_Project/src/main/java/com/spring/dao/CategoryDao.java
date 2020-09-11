package com.spring.dao;

import java.util.List;

import com.spring.entity.Categories;

public interface CategoryDao extends AbstractDao<Categories, Long>{
	List<Categories> getAllCategoryOnlyIdName();
}
