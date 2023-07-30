import './App.css';
import { Box, Stack, createTheme, ThemeProvider } from '@mui/material'

import React from 'react';

import HomeAppBar from './components/HomeAppBar';
import QueryBuilder from './components/QueryBuilder';
import SearchResultsTable from './components/SearchResultsTable';

const theme = createTheme({
  typography:{
    fontSize:12,
    button:{
      borderRadius:'none'
    }
  }
})

const App = () => {
    
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Stack direction="column" spacing={3}>
          <HomeAppBar></HomeAppBar>
          <QueryBuilder></QueryBuilder>
          <SearchResultsTable></SearchResultsTable>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
