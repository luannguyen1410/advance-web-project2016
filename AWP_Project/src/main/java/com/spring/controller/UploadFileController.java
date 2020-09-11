package com.spring.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UploadFileController {
	
	@RequestMapping(value="/upload1",produces = "application/json", method=RequestMethod.POST, consumes = {"multipart/form-data"})
    public @ResponseBody String handleFileUpload(
    		@RequestParam(value = "textMessage",required=false) String message,
            @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile,
            @RequestParam(value = "jsonFile", required = false) MultipartFile jsonFile, 
            @RequestParam(value = "zipFile", required = false) MultipartFile zipFile, 
            @RequestParam(value = "imgFile", required = false) MultipartFile imageFile,            
            MultipartHttpServletRequest request, ModelAndView modelAndView){    
		
		//We have specified the individual file. We can proceed ahead to use if required
		//Here we are extracting the file names from request parameters
		List<String> requestKeys = new ArrayList();
		List<String> originalFileName = new ArrayList();
		request.getFileNames().forEachRemaining(requestKeys::add);		
		for(String multiPartFile : requestKeys) {
			originalFileName.add(request.getFile(multiPartFile).getOriginalFilename());
			
		}
		try{
			//save file
			String fileName = imageFile.getOriginalFilename();
			byte[] bytes = imageFile.getBytes();
			BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(new File("c:/file/" + fileName)));
	        buffStream.write(bytes);
	        buffStream.close();
		}catch(Exception e){
			
		}
		 
		
		return "uploaded files :" + originalFileName.toString();
		//for web clients
		//modelAndView.addObject("files", uploadedFileList);
		//return "FileUpload";
    }
    
	
	@PostMapping(value = "/upload", produces = "application/json", consumes={"application/x-www-form-urlencoded", "multipart/form-data"})
    public ResponseEntity<String> singleSave(@RequestParam("file") MultipartFile file,@RequestParam("name") String name  ){
    	
    	String fileName = null;
    	if (!file.isEmpty()) {
            try {
                fileName = file.getOriginalFilename();
                File path = new File("c:/projectFile");
                if(!path.exists())
                {
                	path.mkdir();
                }
                else
                {
                	byte[] bytes = file.getBytes();
                    //get current time in mili second
                    long seconds = System.currentTimeMillis() ;
                    BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(new File(path.getAbsolutePath() + seconds + "_" + fileName)));
                    buffStream.write(bytes);
                    buffStream.close();
                }
                return new ResponseEntity<String>("You have successfully uploaded " + fileName + name, HttpStatus.OK);
                
            } catch (Exception e) {
                return new ResponseEntity<String>( "You failed to upload " + fileName + ": " + e.getMessage(), HttpStatus.EXPECTATION_FAILED);
            }
        } else {
            return new ResponseEntity<String>("Unable to upload. File is empty." + fileName, HttpStatus.NOT_FOUND);
            
        }
    	
    }
    
}
