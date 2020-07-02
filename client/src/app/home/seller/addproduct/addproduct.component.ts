import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddproductComponent implements OnInit {
  productName: string;
  productImage;
  productPrize: string;
  productCategory: string;
  productCompanyName: string;
  productWarranty: string;
  productDescription: string;

  constructor() {}

  async handleChangefile(e) {
    this.productImage = e.target.files[0];
  }

  async add(e: Event) {
    e.preventDefault();
    var myHeaders : Headers = new Headers();
    myHeaders.append('productname', this.productName);
    myHeaders.append('productimage', this.productImage);
    myHeaders.append('productprize', this.productPrize);
    myHeaders.append('productcategory', this.productCategory);
    myHeaders.append('productcompanyname', this.productCompanyName);
    myHeaders.append('productwarranty', this.productWarranty);
    myHeaders.append('productdescription', this.productDescription);

    var formdata: FormData = new FormData();
    formdata.append('productimage', this.productImage);

    const response: any = await fetch(
      'http://localhost:4000/user/addproduct',
      {
      method: 'POST',
      credentials: 'include',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    });
    const body: any = await response.json();
    console.log(body);
    if (body.status == 'success') {
      alert('product added');
      window.location.reload();
    } else {
      alert('product add failed');
    }
  }

  ngOnInit(): void {}
}
