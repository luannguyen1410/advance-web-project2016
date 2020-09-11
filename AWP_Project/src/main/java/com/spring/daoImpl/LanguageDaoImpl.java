package com.spring.daoImpl;

import org.springframework.stereotype.Repository;

import com.spring.dao.LanguageDao;
import com.spring.entity.Languages;

@Repository
public class LanguageDaoImpl extends AbstractHibernateDao<Languages, Long>implements LanguageDao{

}
