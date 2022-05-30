package ecommerce.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.entities.Book;
import ecommerce.models.ProductDTO;
import ecommerce.models.Response;
import ecommerce.services.BookService;

@CrossOrigin
@RestController
@RequestMapping("/api/books")
public class BookController {
	@Autowired BookService bservice;
	
	@PostMapping
	public ResponseEntity<?> saveBook(ProductDTO dto) {
		System.out.println(dto);
		Book book=ProductDTO.toEntity(dto);
		bservice.addBook(book,dto.getPic());
		return Response.success(book);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateBook(@RequestBody Book book,@PathVariable("id") int id) {
		bservice.updateBook(book);
		return Response.success(book);		
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findBook(@PathVariable("id")int id) {
		Book book=bservice.findBookById(id);
		return Response.success(book);
	}
	
	@GetMapping
	public ResponseEntity<?> findAllProducts() {
		List<Book> result = new ArrayList<Book>();
		for(Book b : bservice.allBooks()) {
			result.add(b);
		}
		return Response.success(result);
	}
	
	@GetMapping("/available")
	public ResponseEntity<?> findAvailableBooks() {
		return Response.success(bservice.allBookAvailable());
	}
	
	@GetMapping("cats")
	public ResponseEntity<?> findByCategory(String cat) {
		List<Book> result = new ArrayList<Book>();
		
		for(Book b : bservice.categoryBooks(cat)) {
			result.add(b);
		}
		
		return Response.success(result);
	}
		
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
		bservice.deleteBook(id);
		return Response.status(HttpStatus.OK);
	}
}
