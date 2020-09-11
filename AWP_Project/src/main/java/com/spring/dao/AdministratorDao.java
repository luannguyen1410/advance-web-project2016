package com.spring.dao;

import com.spring.entity.Administrators;

public interface AdministratorDao extends AbstractDao<Administrators, Long>{

	Administrators loginAdmin(String userName, String password);

}
