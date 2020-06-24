import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../assets/css/addproduct.css', '../../assets/css/home.css'],
})
export class ProductComponent implements OnInit {
  searchValue: string = '';
  temp : any = [];
  lists : any = [];

  constructor(private router: Router) {}

  searchSubmit(event:Event):any {
    // console.log(this.searchValue);
    this.lists = this.temp.filter(
      (value) => {
        // console.log(value.product_category);
        return value.product_category == this.searchValue
      }
    );
    // console.log(this.lists);
    event.preventDefault();
  }
  allproduct():void {
    this.searchValue = "";
    this.lists = this.temp;
  }
  clickProduct(id: number): void{
    this.router.navigate(['/product/' + id]);
  }

  async ngOnInit() {
      const response = await fetch('http://localhost:4000/user/allproduct', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const arr = [];
      for (var i = data.productlist.length - 1; i >= 0; i--) {
        arr.push(data.productlist[i]);
      }
      this.temp = arr;
      this.lists = arr;

  }
}
