import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      title: 'Product 1',
      description: 'This is product 1',
      price: 10,
    },
    {
      id: '2',
      title: 'Product 2',
      description: 'This is product 2',
      price: 20,
    },
    {
      id: '3',
      title: 'Product 3',
      description: 'This is product 3',
      price: 12.5,
    },
  ];
  getAllProducts() {
    return [...this.products];
  }
  getProduct(id: string) {
    const productIndex = this.findProductIndex(id);
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    } else {
      return { ...this.products[productIndex] };
    }
  }
  createProduct(title: string, description: string, price: number) {
    const newId = (
      parseInt(this.products[this.products.length - 1].id) + 1
    ).toString();
    const newProduct = { id: newId, title, description, price };
    this.products.push(newProduct);
    return { newId };
  }
  updateProduct(id: string, title: string, description: string, price: number) {
    const productIndex = this.findProductIndex(id);
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    } else {
      const product = { ...this.products[productIndex] };
      product.title = title ?? product.title;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      this.products[productIndex] = product;
      return product;
    }
  }
  deleteProduct(id: string) {
    const productIndex = this.findProductIndex(id);
    if (productIndex == -1) {
      throw new NotFoundException('Product not found');
    } else {
      this.products.splice(productIndex, 1);
      return { id: productIndex };
    }
  }
  findProductIndex(id: string) {
    return this.products.findIndex((value) => value.id == id);
  }
}
