package com.spring.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.entity.Administrators;
import com.spring.service.AdministratorService;
import com.spring.util.FileUpload;

@RestController
public class AdministratorController {
	@Autowired
	private AdministratorService administratorService;
	
	
	@Autowired
    private HttpServletRequest request;
	
	@GetMapping(value = "/administrator/list", produces = "application/json")
	public List<Administrators> getAllAdministrators() {
		return this.administratorService.getAllAdministrators();
	}


	@PostMapping(value = "/administrator/create", produces = "application/json", consumes={"application/x-www-form-urlencoded", "multipart/form-data"})
	public ResponseEntity<Administrators>  createAdministrator(@RequestParam("file") MultipartFile file, 
			@RequestParam("adm_firstName") String firstName, 
			@RequestParam("adm_lastName") String lastName, 
			@RequestParam("adm_username") String username,
			@RequestParam("adm_password") String password,
			@RequestParam("adm_email") String email,
			@RequestParam("adm_address") String address,
			@RequestParam("adm_phone") String phone,
			@RequestParam("adm_isActive") boolean isActive) {
		FileUpload fileUpload = new FileUpload();
		String imageName = fileUpload.process(file,request.getSession().getServletContext().getRealPath("/"));
    	Administrators admin = new Administrators(firstName, lastName, username, password, email, address, phone, isActive, imageName);
		this.administratorService.createAdministrator(admin);
		return new ResponseEntity<Administrators>(admin, HttpStatus.OK);
	}
	
	@GetMapping(value = "/administrator/view/{id}", produces = "application/json")
	public ResponseEntity<Administrators> getAdministratorById(@PathVariable("id") Long id) {
		Administrators admin = this.administratorService.getAdministrator(id);
		if (admin == null)
			return new ResponseEntity("No Admin found for ID " + id, HttpStatus.NOT_FOUND);
		return new ResponseEntity<Administrators>(admin, HttpStatus.OK);
	}

	@DeleteMapping(value = "/administrator/delete/{id}")
	public ResponseEntity deleteAdministrator(@PathVariable Long id) {
		Administrators admin = this.administratorService.getAdministrator(id);
		if (admin == null)
			return new ResponseEntity("No Admin found for ID " + id, HttpStatus.NOT_FOUND);

		this.administratorService.deleteAdministrator(id);
		return new ResponseEntity(id, HttpStatus.OK);
	}

	@PutMapping("/administrator/update/{id}")
	public ResponseEntity updateAdministrator(@PathVariable Long id, @RequestBody Administrators admin) {
		if (this.administratorService.getAdministrator(id) == null)
			return new ResponseEntity("No Admin found for ID " + id, HttpStatus.NOT_FOUND);

		this.administratorService.updateAdministrator(admin);
		return new ResponseEntity(admin, HttpStatus.OK);
	}
	
	@PostMapping("/administrator/login")
	public Administrators loginAdmin(@RequestParam("username") String userName, @RequestParam("password") String password) {
		return this.administratorService.loginAdmin(userName, password);
	}
}
