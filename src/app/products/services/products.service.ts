import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseApiUrl = 'https://fakestoreapi.com/'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  item: any;
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get(baseApiUrl + 'products')
  }


  getAllCategories() {
    return this.http.get(baseApiUrl + 'products/categories')
  };

  getProductsBy(filter: string) {
    return this.http.get(baseApiUrl + 'products/category/' + filter)
  };

  getProductById(id: any) {
    return this.http.get(baseApiUrl + 'products/' + id)
  }
}
