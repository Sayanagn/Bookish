package ecommerce.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ecommerce.entities.Book;

@Repository
public interface BookDao extends JpaRepository<Book, Integer> {
	
	List<Book> findByCat(String cat);
}
