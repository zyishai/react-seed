import React from 'react';

import { List, makeStyles } from '@material-ui/core';
import { inject } from '../../config/di';
import { ProductStore } from '../../services/product/product.store';
import { useObservableStream } from '../../config/observable-stream.hook';
import { ProductItem } from './product-item';

interface PropTypes {
    productService: ProductStore;
}

const useStyles = makeStyles(theme => ({
    list: {
        width: 420
    }
}));

const ShoppingList: React.ComponentType<PropTypes> = ({ productService }) => {
    const products = useObservableStream(productService.products);
    const classes = useStyles();

    const updateAmount = (productId: string, factor: number) => () => productService.updateAmount(productId, factor);
    const deleteProduct = (productId: string) => () => productService.deleteProduct(productId);

    return (
        <>
            <List classes={{
                root: classes.list
            }}>
                {
                    products ? (
                        products.map(product => (
                            <ProductItem 
                                key={product.id} 
                                product={product} 
                                onUpdateProductAmount={updateAmount}
                                onDeleteItem={deleteProduct} />
                        ))
                    ) : null
                }
            </List>
        </>
    );
}

export default inject({
    productService: ProductStore
})(ShoppingList);