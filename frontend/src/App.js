import './App.css';
import { Box, Stack } from '@mui/material'
import React from 'react';

import HomeAppBar from './components/HomeAppBar';
import QueryBuilder from './components/QueryBuilder';
import SearchResultsTable from './components/SearchResultsTable';



function App() {
    
  return (
    <Box>
      <Stack direction="column" spacing={3}>
        <HomeAppBar></HomeAppBar>
        <QueryBuilder></QueryBuilder>
        <SearchResultsTable></SearchResultsTable>
      </Stack>
    </Box>
  );
}

export default App;
