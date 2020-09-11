package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.PublisherDao;
import com.spring.entity.Publishers;
import com.spring.service.PublisherService;

@Service
@Transactional
public class PublisherServiceImpl implements PublisherService{
	
	@Autowired
	private PublisherDao publisherDao;
	
	@Override
	public void createPublisher(Publishers publisher) {
		this.publisherDao.save(publisher);
	}

	@Override
	public void updatePublisher(Publishers publisher) {
		this.publisherDao.update(publisher);
	}

	@Override
	public void persistPublishers(Publishers publisher) {
		this.publisherDao.persist(publisher);
	}

	@Override
	public void deletePublisher(Long id) {
		this.publisherDao.deleteById(id);
	}

	@Override
	public Publishers getPublisher(Long id) {
		// TODO Auto-generated method stub
		return this.publisherDao.findById(id);
	}

	@Override
	public List<Publishers> getAllPublishers() {
		return this.publisherDao.findAll();
	}

}
