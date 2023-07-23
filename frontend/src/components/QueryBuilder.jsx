import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';


export default function QueryBuilder(props) {

  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [queryLines, setQueryLines] = React.useState([])

  /* 
    const querySchema = {
      queryKey:"Name",
      
    }
  */
  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1){
      filtersArray.pop();
    }
    console.log(`New Filter => ${filtersArray}/${filter.text}`)
  }

  const onNavBlockClicked = () => {
    setFilterKeysHistory((current) => {
      if (current.length > 1){
        const currentCopy = [...current];
        currentCopy.pop();
        return currentCopy;
      } else {
        return current
      }
      
    })
  }

  return (
    <Stack>
      <Box 
        paddingLeft={2}
        backgroundColor={'yellow'}
      >
        {
          queryLines.map((query, index) => {
            const lastQueryKey = [...query].pop(); // Last element is the query key 
            
            return <QueryBlock 
              query={query}
              key={index}
              index={index}
              setQueryLines={setQueryLines}
            />
          })
        }

        <AddFilterButton // Open Dialog to add new companies filter
          toggleFiltersDialog={toggleFiltersDialog}
        />
      </Box>
      <FiltersDialog
        toggleFiltersDialog={toggleFiltersDialog}
        filtersDialogState={filtersDialogState}

        filterKeysHistory={filterKeysHistory}
        setFilterKeysHistory={setFilterKeysHistory}
        onNewFilter={onNewFilter}
        onNavBlockClicked={onNavBlockClicked}
      ></FiltersDialog>
    </Stack>
  );
}
