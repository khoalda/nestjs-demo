import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  addProduct(@Body() prodTitle: string, @Body() prodDesc: string) {
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc);
    return { id: generatedId };
  }
}
