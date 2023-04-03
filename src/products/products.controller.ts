import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
  ) {
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc);
    return { id: generatedId };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const deletedId = this.productsService.deleteProduct(id);
    return deletedId;
  }

  @Patch(':id')
  updateProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Param('id') id: string,
  ) {
    return this.productsService.updateProduct(id, prodTitle, prodDesc);
  }
}
