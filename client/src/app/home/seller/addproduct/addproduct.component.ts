import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddproductComponent implements OnInit {
  productName: string = '';
  productImage;
  productPrize: string = '';
  productCategory: string = '';
  productCompanyName: string = '';
  productWarranty: string = '';
  productDescription: string = '';

  constructor() {}

  async handleChangefile(e) {
    var myHeaders : Headers = new Headers();

    var formdata: FormData = new FormData();
    formdata.append('productimage', e.target.files[0]);

    var requestOptions: any = {
      method: 'POST',
      credentials: 'include',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'http://localhost:4000/user/productimage',
      requestOptions
    ).then((response) => response.text());
  }

  async add(e: Event) {
    e.preventDefault();

    const response: any = await fetch('http://localhost:4000/user/addproduct', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productname: this.productName,
        productimage: 'file',
        productprize: this.productPrize,
        productcategory: this.productCategory,
        productcompanyname: this.productCompanyName,
        productwarranty: this.productWarranty,
        productdescription: this.productDescription,
      }),
    });

    const body: any = await response.json();
    if (body.status == 'success') {
      alert('product added');
      window.location.reload();
    } else {
      alert('product add failed');
    }
  }

  ngOnInit(): void {}
}
