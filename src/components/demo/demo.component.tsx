import React, { useState, useEffect } from 'react';
import 'reflect-metadata';

import { inject } from '../../config/di';
import { Product } from '../../services/product/product';
import { ProductStore } from '../../services/product/product.store';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { map } from 'rxjs/operators';

import './demo.component.scss';

type PropsType = { 
    productService: ProductStore
}

const Demo = ({ productService }: PropsType) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string | null>('');
    const [errors, setErrors] = useState<any[]>([]);

    useEffect(() => {
        console.log('Effect called');
        const subscription = productService.products.subscribe(
            (_products: Product[]) => {
                setProducts(_products);
            }
        );
        const errorSub = productService.errors.pipe(
            map((errs: any[]) => errs.map(err => Object.values(err.constraints)))
        ).subscribe(
            (errors: any[]) => {
                setErrors(errors);
            }
        );

        subscription.add(errorSub);
        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function addProduct() {
        productService.addProduct({
            name: productName as string
        });
        setProductName('');
    }

    return (
        <>
            <TextField
                label="Product name"
                value={productName}
                onChange={e => setProductName(((e.nativeEvent as InputEvent).target as HTMLInputElement).value)} />
            <Button onClick={addProduct}>Add Product</Button>
            {
                errors.map((error, idx) => (
                    <Typography key={error + idx}>{ error }</Typography>
                ))
            }
            <List component="nav">
                {
                    products.map(product => (
                        <ListItem key={product.name}>
                            <ListItemText primary={product.name} />
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}

const InjectedDemo = inject({
    productService: ProductStore
})(Demo);

export default InjectedDemo;