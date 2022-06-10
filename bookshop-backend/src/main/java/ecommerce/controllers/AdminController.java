package ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.entities.Admin;
import ecommerce.entities.Customer;
import ecommerce.models.LoginDTO;
import ecommerce.models.Response;
import ecommerce.services.AdminService;
import ecommerce.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired AdminService adminService;
	
	@PostMapping("/validate")
	
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		
		Admin admin=adminService.validate(dto.getUserid(),dto.getPwd());
		if(admin!=null)
			return Response.success(HttpStatus.OK);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}
	
	
	@PostMapping
	
	public ResponseEntity<?> updateProfile(@RequestBody Admin admin) {
		adminService.updateAdmin(admin);
		return Response.status(HttpStatus.OK);
	}
	
	@Autowired CustomerService customerService;
	@GetMapping("/customers")
	public ResponseEntity<?> findAllCustomers() {
		List<Customer> result = customerService.allCustomers();
		return Response.success(result);
	}

}
