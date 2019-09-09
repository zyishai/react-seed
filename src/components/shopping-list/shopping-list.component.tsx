import React, { useEffect } from 'react';

import './shopping-list.component.scss';
import { List, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, makeStyles, createStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { inject } from '../../config/di';
import { ProductStore } from '../../services/product/product.store';
import Banana from '../../assets/images/vegetables/banana.svg';
import Apple from '../../assets/images/vegetables/apple.svg';
import Cherries from '../../assets/images/vegetables/cherries.svg';
import Lemon from '../../assets/images/vegetables/lemon.svg';
import Orange from '../../assets/images/vegetables/orange.svg';
import Pear from '../../assets/images/vegetables/pear.svg';
import Watermelon from '../../assets/images/vegetables/watermelon.svg';
import { useObservableStream } from '../../config/observable-stream.hook';

const loadFakeData = async (service: any) => {
    await service.addProduct({
        name: 'Banana',
        amount: 5,
        imageUrl: Banana
    });
    await service.addProduct({
        name: 'Apple',
        amount: 7,
        imageUrl: Apple
    });
    await service.addProduct({
        name: 'Cherries',
        amount: 3,
        imageUrl: Cherries
    });
    await service.addProduct({
        name: 'Lemon',
        amount: 11,
        imageUrl: Lemon
    });
    await service.addProduct({
        name: 'Orange',
        amount: 5,
        imageUrl: Orange
    });
    await service.addProduct({
        name: 'Pear',
        amount: 6,
        imageUrl: Pear
    });
    await service.addProduct({
        name: 'Watermelon',
        amount: 1,
        imageUrl: Watermelon
    });
}

interface PropTypes {
    productService: ProductStore;
}

const useStyles = makeStyles(() => createStyles({
    root: {
        width: 420
    }
}));

const ShoppingList: React.ComponentType<PropTypes> = ({ productService }) => {
    let products = useObservableStream(productService.products);
    useEffect(() => {
        loadFakeData(productService);
    }, []);
    
    const styles = useStyles();

    return (
        <>
            <List className={styles.root}>
                {
                    products ? (
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
                    ) : null
                }
            </List>
        </>
    );
}

export default inject({
    productService: ProductStore
})(ShoppingList);