import { provide } from "../../config/di";

@provide()
export class DemoStore {
    message = 'DemoStore injected!';
}