import React from 'react';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';

const Footer: React.ComponentType<any> = (props) => {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                Built with {' '}
                {
                <Favorite fontSize='inherit' />
                } 
                {' '}by Yishai Zehavi
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <a href="https://www.vecteezy.com/">Graphics by: www.vecteezy.com</a>
            </Typography>
        </>
    );
}

export default Footer;
