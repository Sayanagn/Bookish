package ecommerce.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.entities.Address;
import ecommerce.entities.Book;
import ecommerce.entities.Customer;
import ecommerce.entities.Order;
import ecommerce.entities.OrderDetails;
import ecommerce.entities.Payment;
import ecommerce.models.CartDTO;
import ecommerce.models.OrderDetailsDTO;
import ecommerce.models.OrderResponseDTO;
import ecommerce.models.PlaceOrderDTO;
import ecommerce.models.Response;
import ecommerce.services.AddressService;
import ecommerce.services.BookService;
import ecommerce.services.CustomerService;
import ecommerce.services.OrderService;
import ecommerce.services.OrderdetailService;
import ecommerce.services.PaymentService;

@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

	@Autowired OrderService orderService;
	@Autowired CustomerService customerService;

	@Autowired OrderdetailService orderDetailsService;	
	@Autowired BookService bookService;	
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody PlaceOrderDTO dto) {	
		
		Order order=new Order();
		order.setOrderDate(new Date());
		
		Customer customer=customerService.findById(dto.getCustomerid());
		order.setCustomer(customer);
		Order orders=orderService.saveOrder(order);
		
		for(CartDTO cart : dto.getCart()) {
			OrderDetails od=new OrderDetails();
			od.setOrder(orders);
			od.setQty(cart.getQty());
			Book book=bookService.findBookById(cart.getBookid());
			od.setBook(book);			
			orderDetailsService.saveOrderDetails(od);
			book.setQty(book.getQty()-cart.getQty());
			bookService.updateBook(book);
		}
		
		return Response.status(HttpStatus.OK);
	}
	
	
}
