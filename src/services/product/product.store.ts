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
}