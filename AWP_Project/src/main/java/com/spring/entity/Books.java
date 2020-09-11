package com.spring.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "Book")
public class Books {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(length = 20, nullable = false, unique = true)
	private String isbn;
	@Column(length = 100, nullable = false, updatable = false)
	private String title;
	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.DATE)
	private Date publishingDate;
	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.DATE)
	private Date importedDate;
	@Column(length = 500)
	private String description;
	@Column(nullable = false)
	private Byte status;
	@Column(nullable = false)
	private Integer quantity;
	@Column(nullable = false, precision = 8, scale = 2)
	private Double retailPrice;
	@Column(nullable = false, precision = 8, scale = 2)
	private Double salePrice;
	@Column(nullable = false)
	private Boolean isActive;
	private String image;

	
	@ManyToOne
	@JoinColumn(name = "aut_id", nullable = false)
	private Authors author;
	
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Categories category;
	
	@ManyToOne
	@JoinColumn(name = "publisher_id", nullable = false)
	private Publishers publisher;
	
	@ManyToOne
	@JoinColumn(name = "genre_id",  nullable = false)
	private Genres genre;
	
	@ManyToOne
	@JoinColumn(name = "language_id", nullable = false)
	private Languages language;
	
	public Books() {
	}
	
	

	public Books(String isbn, String title, Date publishingDate, Date importedDate, String description, Byte status,
			Integer quantity, Double retailPrice, Double salePrice, Boolean isActive, String image) {
		super();
		this.isbn = isbn;
		this.title = title;
		this.publishingDate = publishingDate;
		this.importedDate = importedDate;
		this.description = description;
		this.status = status;
		this.quantity = quantity;
		this.retailPrice = retailPrice;
		this.salePrice = salePrice;
		this.isActive = isActive;
		this.image = image;
	}



	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIsbn() {
		return isbn;
	}
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getPublishingDate() {
		return publishingDate;
	}
	public void setPublishingDate(Date publishingDate) {
		this.publishingDate = publishingDate;
	}
	public Date getImportedDate() {
		return importedDate;
	}
	public void setImportedDate(Date importedDate) {
		this.importedDate = importedDate;
	}
	public Byte getStatus() {
		return status;
	}
	public void setStatus(Byte status) {
		this.status = status;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Double getRetailPrice() {
		return retailPrice;
	}
	public void setRetailPrice(Double retailPrice) {
		this.retailPrice = retailPrice;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
		
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}

	public void setCategory(Categories category){
		this.category = category;
	}
	
	public Categories getCategory() {
		return category;
	}
	
	public Publishers getPublisher(){
		return publisher;
	}
	public void setPublisher(Publishers publisher){
		this.publisher = publisher;
	}
	
	public Genres getGenre(){
		return genre;
	}
	public void setGenre(Genres genre){
		this.genre = genre;
	}
	
	public Languages getLanguage(){
		return language;
	}
	public void setLanguage(Languages language){
		this.language = language;
	}

	public Authors getAuthor() {
		return author;
	}

	public void setAuthor(Authors author) {
		this.author = author;
	}
	
}
