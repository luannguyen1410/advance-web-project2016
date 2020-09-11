package com.spring.service;

import java.util.List;

import com.spring.entity.Publishers;

public interface PublisherService {
	
	void createPublisher(Publishers publisher);

	void updatePublisher(Publishers publisher);

	void persistPublishers(Publishers publisher);

	void deletePublisher(Long id);

	Publishers getPublisher(Long id);

	List<Publishers> getAllPublishers();
}
