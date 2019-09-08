import React, { useState, useEffect } from 'react';

import './shopping-list.component.scss';
import { List, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, makeStyles, createStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { inject } from '../../config/di';
import { ProductStore } from '../../services/product/product.store';
import { Product } from '../../services/product/product';
import Banana from '../../assets/images/vegetables/banana.svg';
import Apple from '../../assets/images/vegetables/apple.svg';
import Cherries from '../../assets/images/vegetables/cherries.svg';
import Lemon from '../../assets/images/vegetables/lemon.svg';
import Orange from '../../assets/images/vegetables/orange.svg';
import Pear from '../../assets/images/vegetables/pear.svg';
import Watermelon from '../../assets/images/vegetables/watermelon.svg';

interface PropTypes {
    productService: ProductStore;
}

const useStyles = makeStyles(() => createStyles({
    root: {
        width: 420
    }
}));

const ShoppingList: React.ComponentType<PropTypes> = ({ productService }) => {
    const [products, setProducts] = useState<Product[]>([]);
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
            productService.products.subscribe(setProducts);
        })()
    }, []);
    
    const styles = useStyles();

    return (
        <>
            <List className={styles.root}>
                {
                    products.map(product => (
                        <ListItem key={product.id}>
                            <ListItemAvatar>
                                <Avatar src={product.imageUrl} />
                            </ListItemAvatar>
                            <ListItemText primary={product.name} secondary={'Buy ' + product.amount + ' items'} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end">
                                    <AddCircleIcon color="primary" />
                                </IconButton>
                                <IconButton edge="end">
                                    <RemoveCircleIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))   
                }
            </List>
        </>
    );
}

export default inject({
    productService: ProductStore
})(ShoppingList);