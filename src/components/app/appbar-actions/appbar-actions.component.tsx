import React, { useState } from 'react';
import { isWidthDown } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import { AddProductAction } from './add-product-action';

const AppbarActions: React.ComponentType<any> = ({ width }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isMobile = isWidthDown('sm', width, false); // 3rd parameter: inclusive, 
                                                      // we want to exclude small devices 
                                                      // (we still want to show the button 
                                                      // on small devices) so we passed false.

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const actions = (
        <AddProductAction mobile={isMobile} onClick={closeMenu} />
    );

    return (
        <>
            {
                isMobile
                ? (
                    <>
                        <IconButton
                            aria-label="more"
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={openMenu}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            open={open}
                            keepMounted
                            onClose={closeMenu}
                        >
                            { actions }
                        </Menu>
                    </>
                )
                : actions 
            }
        </>
    );
};

export default AppbarActions;