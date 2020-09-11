package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.entity.Feedbacks;
import com.spring.service.FeedbackService;

@RestController
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@GetMapping(value = "/feedback/list", produces = "application/json")
	public List<Feedbacks> getAllFeedbacks(){
		return this.feedbackService.getAllFeedbacks();
	}
	
	@PostMapping(value = "/feedback/create", produces = "application/json")
	public ResponseEntity<Feedbacks> createFeedback(@RequestBody Feedbacks feedback){
		this.feedbackService.createFeedback(feedback);
		return new ResponseEntity<Feedbacks>(feedback, HttpStatus.OK);
	}
	
	@GetMapping(value = "/feedback/view/{id}", produces = "application/json")
	public ResponseEntity<Feedbacks> getFeedbackById(@PathVariable("id") Long id){
		Feedbacks feedback = this.feedbackService.getFeedback(id);
		if(feedback ==null)
			return new ResponseEntity("No Feedback found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Feedbacks>(feedback, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/feedback/delete/{id}")
	public ResponseEntity deleteFeedback(@PathVariable Long id) {		
		Feedbacks feedback = this.feedbackService.getFeedback(id);
		if(feedback ==null)
			return new ResponseEntity("No Feedback found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.feedbackService.deleteFeedbacks(id);		
		return new ResponseEntity(id, HttpStatus.OK);
	}
	
	@PutMapping("/feedback/update/{id}")
	public ResponseEntity updateFeedback(@PathVariable Long id, @RequestBody Feedbacks feedback) {		
		if(this.feedbackService.getFeedback(id) ==null)
			return new ResponseEntity("No Feedback found for ID " + id, HttpStatus.NOT_FOUND);
		
		this.feedbackService.updateFeedback(feedback);
		return new ResponseEntity(feedback, HttpStatus.OK);
	}
}
