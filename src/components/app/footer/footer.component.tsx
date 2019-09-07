import React from 'react';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';

import './footer.component.scss';

const Footer: React.ComponentType<any> = (props) => {
    return (
        <Typography>
            Built with {' '}
            {
              <Favorite fontSize='inherit' />
            } 
            {' '}by Yishai Zehavi
        </Typography>
    );
}

export default Footer;
