import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: [
    '../../../../assets/css/addproduct.css',
    '../../../../assets/css/home.css',
  ],
})
export class OrdersComponent implements OnInit {
  products: any = [];
  constructor() {}

  async ngOnInit(){
     try {
      const response :any = await fetch(
        "http://localhost:4000/user/orders",
        {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data : any = await response.json();
      // console.log(data);
      const arr : any = [];
      for (var i : number= 0; i < data.productlist.length; i++) {
        arr.push(data.productlist[i]);
      }
       this.products = arr;
    } catch (error) {
      console.log(error);
    }
  }
}
