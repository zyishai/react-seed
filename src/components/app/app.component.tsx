import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Box from '@material-ui/core/Box';

import { Footer } from './footer';
import { AppBar } from './app-bar';
import { ShoppingList } from '../shopping-list';
import { Fake } from '../fake';

type DirectionValue = 'rtl' | 'ltr' | undefined;
const direction = process.env.REACT_APP_UI_DIRECTION as DirectionValue;

const theme = createMuiTheme({
  direction,
  typography: {
    fontFamily: process.env.REACT_APP_APP_FONT || 'Roboto'
  }
});

const App: React.ComponentType<any> = ({ width }) => {
  return (
      <ThemeProvider theme={theme}>
        <Fake />
        <AppBar width={width} />
        <Box display='flex' flexDirection='column' overflow='auto' flexGrow={1}>
          <Box flexGrow={1} overflow='auto' alignSelf='center'>
            {/* rest of your app here */}
            <ShoppingList />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
  );
};

export default withWidth()(App);
