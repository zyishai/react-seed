import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { v4 } from 'uuid';
import { ProductProps } from './product-props';


export class Product {
    public readonly id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    public name: string;

    constructor({
        name
    }: ProductProps) {
        this.id = v4();
        this.name = name;
    }
}