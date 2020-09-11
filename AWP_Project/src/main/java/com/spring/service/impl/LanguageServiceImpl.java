package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.LanguageDao;
import com.spring.entity.Languages;
import com.spring.service.LanguageService;

@Service
@Transactional
public class LanguageServiceImpl implements LanguageService{

	@Autowired
	private LanguageDao languageDao;
	
	@Override
	public void createLanguage(Languages language) {
		this.languageDao.save(language);
	}

	@Override
	public void updateLanguage(Languages language) {
		this.languageDao.update(language);
	}

	@Override
	public void persistLanguage(Languages language) {
		this.languageDao.persist(language);
	}

	@Override
	public void deleteLanguage(Long id) {
		this.languageDao.deleteById(id);
	}

	@Override
	public Languages getLanguage(Long id) {
		return this.languageDao.findById(id);
	}

	@Override
	public List<Languages> getAllLanguages() {
		return this.languageDao.findAll();
	}

}
