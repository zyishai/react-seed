import React, { useEffect } from 'react';
import firebase from 'firebase';
import { authState } from 'rxfire/auth';

import { inject } from '../../config/di';
import { ProductStore } from '../../services/product/product.store';

import Banana from '../../assets/images/vegetables/banana.svg';
import Apple from '../../assets/images/vegetables/apple.svg';
import Cherries from '../../assets/images/vegetables/cherries.svg';
import Lemon from '../../assets/images/vegetables/lemon.svg';
import Orange from '../../assets/images/vegetables/orange.svg';
import Pear from '../../assets/images/vegetables/pear.svg';
import Watermelon from '../../assets/images/vegetables/watermelon.svg';

interface Props {
    productService: ProductStore
}

const Fake: React.ComponentType<Props> = ({ productService }) => {
    useEffect(() => {
        (async () => {
            await productService.addProduct({
                name: 'Banana',
                amount: 5,
                imageUrl: Banana
            });
            await productService.addProduct({
                name: 'Apple',
                amount: 7,
                imageUrl: Apple
            });
            await productService.addProduct({
                name: 'Cherries',
                amount: 3,
                imageUrl: Cherries
            });
            await productService.addProduct({
                name: 'Lemon',
                amount: 11,
                imageUrl: Lemon
            });
            await productService.addProduct({
                name: 'Orange',
                amount: 5,
                imageUrl: Orange
            });
            await productService.addProduct({
                name: 'Pear',
                amount: 6,
                imageUrl: Pear
            });
            await productService.addProduct({
                name: 'Watermelon',
                amount: 1,
                imageUrl: Watermelon
            });
        })()
    }, [productService]);

    return null;
}

export default inject({
    productService: ProductStore
})(Fake);