package com.spring.service;

import java.util.List;
import com.spring.entity.Administrators;

public interface AdministratorService {
	
	void createAdministrator(Administrators administrator);

	void updateAdministrator(Administrators administrator);

	void persistAdministrator(Administrators administrator);

	void deleteAdministrator(Long id);

	Administrators getAdministrator(Long id);

	List<Administrators> getAllAdministrators();
	
	Administrators loginAdmin(String userName, String password);
}
