import { validate } from 'class-validator';
import { Product } from './product';
import { ProductProps } from './product-props';
import { provide } from '../../config/di';
import { BehaviorSubject, Observable } from 'rxjs';

@provide()
export class ProductStore {
    private _products = new BehaviorSubject<Product[]>([]);
    private _errors = new BehaviorSubject<any[]>([]);

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

    async updateProduct(productId: string, props: Partial<ProductProps>) {
        const tempProducts = this._products.value.slice();
        const product = tempProducts.find(product => product.id === productId);

        if (product && product instanceof Product) {
            type ProductKey = keyof ProductProps;
            Object.keys(props).forEach((key: any) => {
                // see: https://github.com/microsoft/TypeScript/issues/31663
                (product as any)[key] = props[key as ProductKey];
            });
        }

        this._errors.next([]);
        this._products.next(tempProducts);
    }

    async updateAmount(productId: string, amount: number) {
        const tempProducts = this._products.value.slice();
        const product = tempProducts.find(product => product.id === productId);

        if (product && product.amount + amount >= 0) {
            product.amount += amount;
            this._products.next(tempProducts);
        }
    }

    async deleteProduct(productId: string): Promise<Product | null> {
        const productIndex = this._products.value.findIndex(product => product.id === productId);

        if (productIndex >= 0) {
            const products = this._products.value.slice();
            const removedItem = products.splice(productIndex, 1)[0];
            this._products.next(products);
            return removedItem;
        }

        this._errors.next([]);

        return null;
    }

    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    get products(): Observable<Product[]> {
        delete (this as any).products;

        Object.defineProperty(this, 'products', {
            value: this._products.asObservable()
        });

        return this.products;
    }

    get errors(): Observable<any[]> {
        delete (this as any).errors;

        Object.defineProperty(this, 'errors', {
            value: this._errors.asObservable()
        });

        return this.errors;
    }
}