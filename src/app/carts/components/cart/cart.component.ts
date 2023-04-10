import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: any[] = [];
  total: number = 0;
  productsPriceTogether: number = 0;
  success: boolean = false


  constructor(
    private cartService: CartsService
  ) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getTotal()


  }
  getTotal() {
    this.total = 0
    for (let i in this.cartProducts) {
      this.total += this.cartProducts[i].item.price * this.cartProducts[i].quantity;
    }
    console.log(this.productsPriceTogether);

  }

  decreaseAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))

  }
  increaseAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  detectChange() {
    this.getTotal()

    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }
  clearCart() {
    this.cartProducts = []
    this.getTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))

  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return { productId: item.item.id, quantity: item.quantity }
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }

    this.cartService.createNewCart(Model).subscribe(res => {
      this.success = true
    })

  }


}
