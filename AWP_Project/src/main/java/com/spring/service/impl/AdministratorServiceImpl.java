package com.spring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.dao.AdministratorDao;
import com.spring.entity.Administrators;
import com.spring.service.AdministratorService;

@Service
@Transactional
public class AdministratorServiceImpl implements AdministratorService{
	
	@Autowired
	private AdministratorDao administratorDao;
	
	public AdministratorServiceImpl() {
		super();
	}

	@Override
	public void createAdministrator(Administrators administrator) {
		this.administratorDao.save(administrator);
	}

	@Override
	public void updateAdministrator(Administrators administrator) {
		this.administratorDao.update(administrator);
	}

	@Override
	public void persistAdministrator(Administrators administrator) {
		this.administratorDao.persist(administrator);
	}

	@Override
	public void deleteAdministrator(Long id) {
		this.administratorDao.deleteById(id);
	}

	@Override
	public Administrators getAdministrator(Long id) {
		return this.administratorDao.findById(id);
	}

	@Override
	public List<Administrators> getAllAdministrators() {
		return this.administratorDao.findAll();
	}

	@Override
	public Administrators loginAdmin(String userName, String password) {
		return this.administratorDao.loginAdmin(userName, password);
	}
}
