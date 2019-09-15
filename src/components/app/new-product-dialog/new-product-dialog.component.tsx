import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, TextField, makeStyles, Theme, createStyles, DialogActions, Button, FormControl, FormHelperText } from '@material-ui/core';
import { ProductProps } from '../../../services/product/product-props';
import { inject } from '../../../config/di';
import { ProductStore } from '../../../services/product/product.store';
import { useObservableStream } from '../../../config/observable-stream.hook';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

interface Props {
    open: boolean;
    onClose: () => void;
    productService: ProductStore;
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        formControl: {
            margin: theme.spacing(2)
        }
    })
);

const NewProductDialog: React.ComponentType<Props> = ({ open, onClose, productService }) => {
    const errors = useObservableStream(
        productService.errors, 
        pipe(
            map((errs: any[]) => errs.reduce((acc, err) => ({
                ...acc,
                [err.property]: Object.values(err.constraints)
            }), {}))
        )
    );
    const [productProps, setProductProps] = useState<ProductProps>({
        name: '',
        amount: 0,
        imageUrl: ''
    });
    const styles = useStyles();

    const setProductProp = (propName: string, isNumber = false) => (e: any) => setProductProps({ ...productProps, [propName]: isNumber ? Number(e.target.value) : e.target.value });

    const addProduct = () => {
        productService.addProduct(productProps);
        onClose();
    }

    const createFormField = ({
        label,
        propName,
        propIsNumber,
        ...rest
    }: any) => (
        <FormControl className={styles.formControl}>
            <TextField
                label={label}
                onChange={setProductProp(propName, propIsNumber)}
                {...rest} />
            { errors && errors[propName] 
                ? errors[propName].map((err: string) => <FormHelperText>{err}</FormHelperText>)
                : null }
        </FormControl>
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Product</DialogTitle>

            { createFormField({ autoFocus: true, label: 'name of product', required: true, propName: 'name' }) }
            { createFormField({ label: 'amount of products', propName: 'amount', propIsNumber: true, type: 'number', inputProps: { min: 0, max: 100 }, required: true, defaultValue: 0 }) }
            { createFormField({ label: 'url of product image', propName: 'imageUrl', required: true }) }

            <DialogActions>
                <Button
                    onClick={addProduct}>Add Product</Button>
                <Button
                    onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default inject({
    productService: ProductStore
})(NewProductDialog);