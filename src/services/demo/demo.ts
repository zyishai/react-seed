import { provide } from "../../config/di";

@provide({
    behaviour: 'multi'
})
export class Demo {
    name = 'Demo instance!';
}