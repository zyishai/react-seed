import React from 'react';

// material-ui imports
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import CopyrightIcon from '@material-ui/icons/Copyright';

const Footer: React.ComponentType<any> = () => {
    return (
        <Box py={2}>
            <Typography variant="body2" color="textSecondary" align="center">
                Built with {' '}
                {
                    <Favorite fontSize='inherit' />
                }
                {' '}by Yishai Zehavi
            </Typography>
            <Typography variant='body2' color='textSecondary' align='center'>
                <CopyrightIcon fontSize='inherit' /> {' ' + new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

export default Footer;