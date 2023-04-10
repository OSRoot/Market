import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://fakestoreapi.com/'
@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(
    private http: HttpClient
  ) { }


  createNewCart(model: any) {
    return this.http.post(baseUrl + 'carts', model)
  }


}
