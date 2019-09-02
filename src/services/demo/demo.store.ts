import { provide } from "../../config/di";
import { ProductStore } from "../product/product.store";

@provide()
export class DemoStore {
    message = 'DemoStore injected!';

    constructor(public productService: ProductStore) {}
}