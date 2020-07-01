import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../assets/css/addproduct.css', '../../assets/css/home.css'],
})
export class ProductComponent implements OnInit {
  searchValue: string = '';
  lists: any = [];
  scroll: number = 0;
  limit: number = 10;
  offsetStart: number = 0;
  arr: any = [];
  end: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  search(event: Event) {
    this.searchValue = (<HTMLInputElement>event.target).value;
    if (this.searchValue === '') this.allproduct();
    else this.searchProduct();
    event.preventDefault();
  }

  searchProduct() {
    this.end = false;
    setTimeout(async () => {
      const response: any = await fetch(
        'http://localhost:4000/user/searchproduct?limit=' +
          this.limit +
          '&offset=' +
          this.offsetStart,
        {
          method: 'post',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            search: this.searchValue,
          }),
        }
      );
      const data: any = await response.json();
      if (!data.productlist.length || data.productlist.length < 10)
        this.end = true;
      this.arr = [];
      for (var i = 0; i < data.productlist.length; i++) {
        this.arr.push(data.productlist[i]);
      }
      this.lists = this.arr;
    }, 500);
  }

  async allproduct() {
    this.searchValue = '';
    const response = await fetch(
      'http://localhost:4000/user/allproduct?limit='+this.limit+'&offset='+this.offsetStart,
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data.productlist);
    if (!data.productlist.length || data.productlist.length<10) this.end = true;
    for (var i = 0; i < data.productlist.length; i++) {
      this.arr.push(data.productlist[i]);
    }
    this.lists=this.arr;
  }
  clickProduct(id: number): void {
    this.router.navigate(['/product/' + id]);
  }
  allproductLoad() {
    this.arr = [];
    this.offsetStart = 0;
    this.scroll = 0;
    this.allproduct();
  }

  async onScroll() {
    this.scroll = this.scroll + 1;
    this.offsetStart = this.scroll * 10;
    if (this.searchValue == '') this.allproduct();
    else this.searchProduct();

  }

  async ngOnInit() {
    this.allproduct();
  }
}
