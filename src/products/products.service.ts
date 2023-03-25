import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      title: 'Product 1',
      description: 'This is product 1',
    },
    {
      id: '2',
      title: 'Product 2',
      description: 'This is product 2',
    },
    {
      id: '3',
      title: 'Product 3',
      description: 'This is product 3',
    },
  ];

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId: string) {
    return this.products.find((prod) => prod.id === prodId);
  }

  insertProduct(prodTitle: string, prodDesc: string) {
    // const prodId = (Math.random() % 100).toString();
    const lastId = this.products[this.products.length - 1].id;
    // const maxId = this.products.reduce((max, prod) => {
    //   return max > parseInt(prod.id) ? max : parseInt(prod.id);
    // }, 0);

    const nextId = (parseInt(lastId) + 1).toString();

    this.products.push({
      id: nextId,
      title: prodTitle,
      description: prodDesc,
    });

    return nextId;
  }
}
