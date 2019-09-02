import React, { useState, useEffect } from 'react';
import 'reflect-metadata';

import './demo.component.scss';
import { DemoStore } from '../../services/demo/demo.store';
import { inject } from '../../config/di';
import { Demo as DemoInst } from '../../services/demo/demo';
import { Product } from '../../services/product/product';

type PropsType = { 
    board: DemoStore,
    inst: DemoInst
};

const Demo = ({ board, inst }: PropsType) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        board.productService.addProduct(new Product({
            name: 'Bread'
        })).then(() => {
            board.productService.getProducts().then(p => setProducts(p as any));
        });
    }, []);
    return (
        <span>Demo works! { board.message } { inst.name } {JSON.stringify(products)}</span>
    );
}

const InjectedDemo = inject({
    board: DemoStore,
    inst: DemoInst
})(Demo);

export default InjectedDemo;