import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: [
    '../../../../assets/css/addproduct.css',
    '../../../../assets/css/home.css',
  ],
})
export class SellerProductComponent implements OnInit {
  lists: any = '';
  constructor(private router :Router) {}

  clickProduct(id: number): void {
    this.router.navigate(['/product/'+id]);
  }

  async ngOnInit() {
    try {
      const response: any = await fetch(
        'http://localhost:4000/user/sellerproduct',
        {
          method: 'post',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data: any = await response.json();
      const arr: any = [];
      for (var i = data.productlist.length - 1; i >= 0; i--) {
        arr.push(data.productlist[i]);
      }
      this.lists = arr;
      // console.log(this.lists);
    } catch (error) {
      console.log(error);
    }
  }
}
