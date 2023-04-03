import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  // const maxId = this.products.reduce((max, prod) => {
  //   return max > parseInt(prod.id) ? max : parseInt(prod.id);
  // }, 0);

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
    console.log('Added product:', this.products[-1]);
    return nextId;
  }
  findProduct(id: string) {
    return this.products.findIndex((value) => value.id == id);
  }
  deleteProduct(id: string) {
    const productIndex = this.findProduct(id);
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    } else {
      this.products.splice(productIndex, 1);
      return id;
    }
  }
  updateProduct(id: string, prodTitle: string, prodDesc: string) {
    const productIndex = this.findProduct(id);
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    } else {
      const updatedProduct = this.products[productIndex];
      updatedProduct.description = prodDesc ?? updatedProduct.description;
      updatedProduct.title = prodTitle ?? updatedProduct.title;
      this.products[productIndex] = updatedProduct;
      return { ...this.products[productIndex] };
    }
  }
}
