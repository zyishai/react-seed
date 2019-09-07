import React from 'react';
import { observer } from 'mobx-react';
import withWidth from '@material-ui/core/withWidth';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Box from '@material-ui/core/Box';

import { Footer } from './footer';
import { AppBar } from './app-bar';

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
        <AppBar width={width} />
        <Box display='flex' flexDirection='column' overflow='auto' flexGrow={1}>
          <Box flexGrow={1} overflow='auto' alignSelf='center'>
            {/* rest of your app here */}
          </Box>
          <Box px={2} py={1} textAlign='center' bgcolor="secondary.main" color="secondary.contrastText">
            <Footer />
          </Box>
        </Box>
      </ThemeProvider>
  );
};

export default observer(withWidth()(App));
