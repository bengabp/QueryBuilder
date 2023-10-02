import './App.css';
import './styles/titleBlockStyles/titleBlockFirst.css';
import './styles/titleBlockStyles/titleBlockNotFirst.css';

import './styles/lastBlockStyles/lastBlockFirst.css';
import './styles/lastBlockStyles/lastBlockNotFirst.css'; 

import { Box, Stack, createTheme, ThemeProvider } from '@mui/material'

import React from 'react';

import HomeAppBar from './components/HomeAppBar';
import QueryBuilder from './components/QueryBuilder';
import SearchResultsTable from './components/SearchResultsTable';
import { SettingsProvider } from './contexts/SettingsContext';
import {ValueProvider} from './contexts/ValueContext'

const theme = createTheme({
  typography:{
    fontSize:12
  }
})


const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
    
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Stack direction="column" spacing={3}>
          <HomeAppBar isLoading={isLoading}></HomeAppBar>
          <SettingsProvider>
            <ValueProvider>
            <QueryBuilder isLoading={isLoading} setIsLoading={setIsLoading}></QueryBuilder>
            <SearchResultsTable></SearchResultsTable>
            </ValueProvider>
          </SettingsProvider>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
