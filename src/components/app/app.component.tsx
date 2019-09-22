import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Box from '@material-ui/core/Box';

import { Footer } from './footer';
import { AppBar } from './app-bar';
import { ShoppingList } from '../shopping-list';
import { Fake } from '../fake';
import { AppRouter } from '../app-router';
import { Route } from '../../types/route';
import { Home } from '../home';
import { Guest } from '../guest';
import { responsiveFontSizes } from '@material-ui/core';

type DirectionValue = 'rtl' | 'ltr' | undefined;
const direction = process.env.REACT_APP_UI_DIRECTION as DirectionValue;

const theme = responsiveFontSizes(createMuiTheme({
  direction,
  typography: {
    fontFamily: process.env.REACT_APP_APP_FONT || 'Roboto'
  }
}));

const routes: Route[] = [
  { path: '/', exact: true, component: Home },
  { path: '/guest', component: Guest }
];

const App: React.ComponentType<any> = ({ width }) => {
  return (
      <ThemeProvider theme={theme}>
        <Fake />
        <AppBar width={width} />
        <Box display='flex' flexDirection='column' overflow='auto' flexGrow={1}>
          <AppRouter routes={routes} />
          <Footer />
        </Box>
      </ThemeProvider>
  );
};

export default withWidth()(App);
