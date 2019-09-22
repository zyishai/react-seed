import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { Route as RouteConfig } from '../../types/route';

interface Props {
  routes: RouteConfig[];
}

const AppRouter: React.ComponentType<Props> = (props) => {
    return (
        <Router>
          <Box 
            flexGrow={1} 
            alignSelf='stretch' 
            alignContent='center' 
            display='flex' 
            flexDirection='column'
            overflow='auto'>
            {
              props.routes.map((route, idx) => 
                <Route key={route.path+idx} {...route} />
              )
            }
          </Box>
        </Router>
    );
}

export default AppRouter;