package com.spring.service;

import java.util.List;

import com.spring.entity.Feedbacks;

public interface FeedbackService {
	
	void createFeedback(Feedbacks feedback);

	void updateFeedback(Feedbacks feedback);

	void persistFeedbacks(Feedbacks feedback);

	void deleteFeedbacks(Long id);

	Feedbacks getFeedback(Long id);

	List<Feedbacks> getAllFeedbacks();
}
