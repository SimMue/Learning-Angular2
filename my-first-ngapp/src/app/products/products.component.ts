import { Component } from '@angular/core';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
})

export class ProductsComponent {
  title = 'Products';
  products = [
    "Apple",
    "Orange",
    "Banana"
  ];
}