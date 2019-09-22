import React, { useState } from 'react';
import { inject } from '../../config/di';
import { User } from '../../services/user/user.service';
import { Button, Box, Theme } from '@material-ui/core';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { useObservableStream } from '../../config/observable-stream.hook';
import empty from '../../assets/images/empty.gif';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    overlay: {
        backgroundImage: `url(${empty})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
    }
}));

interface Props {
    userService: User;
}

const Guest: React.ComponentType<Props & RouteComponentProps> = (props) => {
    const styles = useStyles();
    const user = useObservableStream(props.userService.getUser());
    const signIn = () => {
        props.userService.signIn()
            .then(() => {
                if (props.location.state && props.location.state.url) {
                    props.history.replace(props.location.state.url);
                }
            });
    }
    return (
        user
        ? <Redirect to="/" />
        : (
            <Box 
                className={styles.overlay} 
                flexGrow={1} 
                display='flex' 
                flexDirection='column' 
                justifyContent='space-between' 
                alignItems='center'
                textAlign='center'
                py={3}>
                <h1>Sorry, it seems you are not logged in..</h1>
                <Button onClick={signIn} variant='contained' color='primary'>Log In</Button>
            </Box>
        )
    );
}

export default withRouter(inject({
    userService: User
})(Guest));