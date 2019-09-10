import React, { useState } from 'react';
import { ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Tooltip, makeStyles, Box } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import { Product } from '../../../services/product/product';

interface Props {
    product: Product,
    onUpdateProductAmount: (id: string, amount: number) => () => void,
    onDeleteItem: (id: string) => () => void
}

const useStyles = makeStyles(theme => ({
    itemAvatar: {
        position: 'relative'
    },
    avatarOverlay: {
        color: '#000',
        opacity: 0.8,
        position: 'absolute',
        top: 0,
        zIndex: 1000
    }
}));

const ProductItem: React.ComponentType<Props> = ({ product, onUpdateProductAmount, onDeleteItem }) => {
    const [isHover, setIsHover] = useState(false);
    const classes = useStyles();

    return (
        <ListItem key={product.id}>
            <Box
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
                <ListItemAvatar classes={{
                    root: classes.itemAvatar
                }}>
                    <>
                        <Avatar src={product.imageUrl} />
                        {isHover ? (<Avatar classes={{
                            root: classes.avatarOverlay
                        }}>
                            <IconButton onClick={onDeleteItem(product.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Avatar>) : null}
                    </>
                </ListItemAvatar>
            </Box>
            <ListItemText primary={product.name} secondary={'Buy ' + product.amount + ' items'} />
            <ListItemSecondaryAction>
                <Tooltip title="Add">
                    <IconButton edge="end" onClick={onUpdateProductAmount(product.id, 1)}>
                        <AddCircleIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Substract">
                    <IconButton edge="end" disabled={product.amount === 0} onClick={onUpdateProductAmount(product.id, -1)}>
                        <RemoveCircleIcon />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default ProductItem;