package com.spring.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.dao.FeedbackDao;
import com.spring.entity.Feedbacks;
import com.spring.service.FeedbackService;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService{

	@Autowired
	private FeedbackDao feedbackDao;
	
	@Override
	public void createFeedback(Feedbacks feedback) {
		this.feedbackDao.save(feedback);
	}

	@Override
	public void updateFeedback(Feedbacks feedback) {
		this.feedbackDao.update(feedback);;
	}

	@Override
	public void persistFeedbacks(Feedbacks feedback) {
		this.feedbackDao.persist(feedback);
	}

	@Override
	public void deleteFeedbacks(Long id) {
		this.feedbackDao.deleteById(id);
	}

	@Override
	public Feedbacks getFeedback(Long id) {
		return this.feedbackDao.findById(id);
	}

	@Override
	public List<Feedbacks> getAllFeedbacks() {
		return this.feedbackDao.findAll();
	}

}
