package ecommerce.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import ecommerce.entities.Book;

public class ProductDTO {
	
	private int bookid;
	private String bname;
	private String cat;
	private int qty;
	private int price;
	private String author;
	private MultipartFile pic;
	
	public int getBookid() {
		return bookid;
	}

	public void setBookid(int bookid) {
		this.bookid = bookid;
	}

	public String getBname() {
		return bname;
	}

	public void setBname(String bname) {
		this.bname = bname;
	}

	public String getCat() {
		return cat;
	}

	public void setCat(String cat) {
		this.cat = cat;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public MultipartFile getPic() {
		return pic;
	}

	public void setPic(MultipartFile pic) {
		this.pic = pic;
	}

	public static Book toEntity(ProductDTO dto) {
		Book entity=new Book();
		BeanUtils.copyProperties(dto, entity, "pic");		
		return entity;
	}
}
