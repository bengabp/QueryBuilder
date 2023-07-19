import './App.css';
import { Box, Container, Stack } from '@mui/material'
import React from 'react';

import HomeAppBar from './components/HomeAppBar';
import QueryBuilder from './components/QueryBuilder';
import SearchResultsTable from './components/SearchResultsTable';
import QueryBlock from './components/QueryBlock';


function App() {
  
  return (
    <Box>
      <Stack direction="column" spacing={3}>
        <HomeAppBar></HomeAppBar>
        <Container>
          <QueryBlock></QueryBlock>
        </Container>
        <SearchResultsTable></SearchResultsTable>
      </Stack>
    </Box>
  );
}

export default App;
