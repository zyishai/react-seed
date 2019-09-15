import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { NewProductDialog } from '../../new-product-dialog';

interface Props {
    mobile: boolean;
    onClick: () => void;
}

const AddProductAction: React.ComponentType<Props> = ({ mobile, onClick }) => {
    const [open, setOpen] = useState(false);

    const openNewProductModal = () => {
        setOpen(true);
        onClick();
    }

    const closeDialog = () => setOpen(false);

    return (
        <>
            <NewProductDialog open={open} onClose={closeDialog} />
            {
                mobile
                ? <MenuItem key='add-product' onClick={openNewProductModal}>Add Product</MenuItem>
                : <Button color="inherit" onClick={openNewProductModal}>Add Product</Button>
            }
        </>
    );
}

export default AddProductAction;