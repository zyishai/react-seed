import React from 'react';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';

const Footer: React.ComponentType<any> = (props) => {
    return (
        <Box py={2}>
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
        </Box>
    );
}

export default Footer;
