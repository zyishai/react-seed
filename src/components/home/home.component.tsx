import React from 'react';

import { User } from '../../services/user/user.service';
import { inject } from '../../config/di';
import { useObservableStream } from '../../config/observable-stream.hook';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router';

interface Props {
    userService: User;
}

const Home: React.ComponentType<Props> = (props) => {
    const user = useObservableStream(props.userService.getUser(), null, true); 
    return (
        user
        ? <>
            <h1>Hi, {user.displayName}</h1>
            <Button onClick={props.userService.signOut}>Log Out</Button>
          </>
        : <Redirect to={{
            pathname: '/guest',
            state: {
                url: '/'
            }
        }} />
    );
}

export default inject({
    userService: User
})(Home);