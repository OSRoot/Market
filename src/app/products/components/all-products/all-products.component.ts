import { Component, OnInit } from '@angular/core';
import Product from 'src/app/shared/types/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {


  products: Product[] = []
  categories: string[] = []
  loading: boolean = false;
  cartProducts: any[] = []
  constructor(
    private productService: ProductsService

  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories()
  }

  getProducts() {
    this.loading = true
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false
    }, err => {
      this.loading = false
      alert('Error')
    })
  }

  getCategories() {
    this.loading = true
    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false

    }
      // , err => {
      //   alert('Error')
      // }
    )
  }
  filterBy(event: any) {
    let value = event.target.value;
    (value === 'all') ? this.getProducts() : this.getProductsBy(value);



  }

  getProductsBy(filter: string) {
    this.loading = true
    this.productService.getProductsBy(filter).subscribe((res: any) => {
      this.products = res
      this.loading = false
    })

  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);

      let exists = this.cartProducts.find(item => item.item.id == event.item.id)
      if (exists) {
        alert('Product is Already in Your Cart!')
      } else {
        this.cartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }


    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }

  }


}
