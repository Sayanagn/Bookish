package ecommerce.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ecommerce.daos.BookDao;
import ecommerce.entities.Book;
import ecommerce.utils.StorageService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired private StorageService storageService;
	@Autowired private BookDao dao;
	@Override
	public void addBook(Book b, MultipartFile pic) {
		// TODO Auto-generated method stub
		String photo=storageService.store(pic);
		b.setPhoto(photo);
		dao.save(b);
	}

	@Override
	public void updateBook(Book b) {
		// TODO Auto-generated method stub
		dao.save(b);
	}

	@Override
	public void deleteBook(int id) {
		// TODO Auto-generated method stub
		Book entity=dao.getById(id);
		dao.delete(entity);
	}

	@Override
	public List<Book> allBooks() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public List<Book> categoryBooks(String cat) {
		System.out.println(cat);
		// TODO Auto-generated method stub
		return dao.findByCat(cat).stream().filter(b->b.getQty()>0).collect(Collectors.toList());
	}

	@Override
	public Book findBookById(int prodid) {
		// TODO Auto-generated method stub
		return dao.getById(prodid);
	}

	@Override
	public List<Book> allBookAvailable() {
		// TODO Auto-generated method stub
		return dao.findAll().stream().filter(b->b.getQty()>0).collect(Collectors.toList());
	}

}
