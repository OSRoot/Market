import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  id: any
  data: any = {}
  loading: boolean = false
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

  }

  ngOnInit(): void {
    this.getOneByID()
  }


  getOneByID() {
    this.loading = true
    this.productService.getProductById(this.id).subscribe(res => {
      this.loading = false
      this.data = res

    }, err => {
      this.loading = false;
      alert('Error')
    })

  }
}
