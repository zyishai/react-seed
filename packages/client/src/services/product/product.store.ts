import { validate } from 'class-validator';
import { Product } from './product';
import { ProductProps } from './product-props';
import { ProductQuery } from './product.query';
import { provide } from '@react-seed/di';
import { BehaviorSubject, Observable } from 'rxjs';

@provide()
export class ProductStore {
    private _products = new BehaviorSubject<Product[]>([]);
    private _errors = new BehaviorSubject<any[]>([]);

    constructor() {}

    async addProduct(props: ProductProps): Promise<Product | null> {
        const product = new Product(props);

        const errors = await validate(product);

        if (errors && errors.length) {
            this._errors.next(errors);
            return null;
        }

        this._errors.next([]);
        this._products.next([
            ...this._products.value,
            product
        ]);

        return product;
    }

    async deleteProduct(productId: string): Promise<Product | null> {
        const productIndex = this._products.value.findIndex(product => product.id === productId);

        if (productIndex >= 0) {
            const products = this._products.getValue();
            const removedItem = products.splice(productIndex, 1)[0];
            this._products.next(products);
            return removedItem;
        }

        this._errors.next([]);

        return null;
    }

    get products(): Observable<Product[]> {
        return this._products.asObservable();
    }

    get errors() {
        return this._errors.asObservable();
    }

    async getProducts(query?: ProductQuery) {
        let _tempProducts = this._products.value.slice();

        if (query) {
            _tempProducts = _tempProducts.filter(product => product.name.includes(query.name));
        }

        return _tempProducts;
    }
}