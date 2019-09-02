import { observable, action, computed } from 'mobx';
import { validate } from 'class-validator';
import { Product } from './product';
import { ProductProps } from './product-props';
import { ProductQuery } from './product.query';

export class ProductStore {
    @observable private _products: Array<Product> = [];

    constructor() {}

    @action
    async addProduct(props: ProductProps): Promise<Product | null> {
        const product = new Product(props);

        const errors = await validate(product);

        if (errors && errors.length) {
            console.error(errors);
            return null;
        }

        this._products.push(product);

        return product;
    }

    @action
    async deleteProduct(productId: string): Promise<Product | null> {
        const productIndex = this._products.findIndex(product => product.id === productId);

        if (productIndex >= 0) {
            return this._products.splice(productIndex, 1)[0];
        }

        return null;
    }

    async getProducts(query?: ProductQuery) {
        let _tempProducts = this._products.slice();

        if (query) {
            _tempProducts = _tempProducts.filter(product => product.name.includes(query.name));
        }

        return _tempProducts;
    }
}