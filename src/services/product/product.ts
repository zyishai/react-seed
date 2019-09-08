import { IsString, IsNotEmpty, MinLength, IsNumber, Min,  } from 'class-validator';
import { v4 } from 'uuid';
import { ProductProps } from './product-props';


export class Product {
    public readonly id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public name: string;

    @IsString()
    @IsNotEmpty()
    public imageUrl: string;

    @IsNumber()
    @Min(0)
    public amount: number;

    constructor({
        name,
        imageUrl,
        amount
    }: ProductProps) {
        this.id = v4();
        this.name = name;
        this.imageUrl = imageUrl;
        this.amount = amount;
    }
}