package ecommerce.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import ecommerce.entities.Book;

public interface BookService {
	void addBook(Book b,MultipartFile pic);
	void updateBook(Book b);
	void deleteBook(int id);
	List<Book> allBooks();
	List<Book> categoryBooks(String cat);
	Book findBookById(int prodid);
	List<Book> allBookAvailable();
}
