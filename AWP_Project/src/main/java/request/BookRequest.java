package request;

public class BookRequest {

	private Long id;
	private Byte status;
	private Double retailPrice;
	private Double salePrice;
	private Integer quantity;
	private Boolean isActive;

	public BookRequest() {
		super();
//		Long id, Byte status,Double retailPrice, Double salePrice, Integer quantity,Boolean isActive
//		this.status = status;
//		this.retailPrice = retailPrice;
//		this.salePrice = salePrice;
//		this.quantity = quantity;
//		this.isActive = isActive;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
}
