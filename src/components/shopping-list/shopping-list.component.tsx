import React from 'react';

import { List, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { inject } from '../../config/di';
import { ProductStore } from '../../services/product/product.store';
import { useObservableStream } from '../../config/observable-stream.hook';

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

    return (
        <>
            <List classes={{
                root: classes.list
            }}>
                {
                    products ? (
                        products.map(product => (
                            <ListItem key={product.id}>
                                <ListItemAvatar>
                                    <Avatar src={product.imageUrl} />
                                </ListItemAvatar>
                                <ListItemText primary={product.name} secondary={'Buy ' + product.amount + ' items'} />
                                <ListItemSecondaryAction>
                                    <Tooltip title="Add">
                                        <IconButton edge="end" onClick={() => productService.updateAmount(product.id, 1)}>
                                            <AddCircleIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Substract">
                                        <IconButton edge="end" disabled={product.amount === 0} onClick={() => productService.updateAmount(product.id, -1)}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </Tooltip>
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