interface Product {
    id : number,
    product_title : string,
    product_description : string,
    product_price : number,
    product_quantity : number,
    product_image : string
  }
  
  interface ProductAndQuantity {
    product : Product,
    quantity : number
  }