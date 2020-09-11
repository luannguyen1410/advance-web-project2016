package com.spring.service;

import java.util.List;

import com.spring.entity.Languages;

public interface LanguageService {
	
	void createLanguage(Languages language);

	void updateLanguage(Languages language);

	void persistLanguage(Languages language);

	void deleteLanguage(Long id);

	Languages getLanguage(Long id);

	List<Languages> getAllLanguages();
}
