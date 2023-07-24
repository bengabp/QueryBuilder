import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';
import QueryBlock from './QueryBlock';

export default function QueryBuilder(props) {

  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [queryLines, setQueryLines] = React.useState([])

  /* 
    const querySchema = {
      queryKey:"Name",
      dataKey:'real_db_value",
      dType:"number",
      path:['basic_info']
      
      
    }
  */
  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1){
      filtersArray.pop();
    }
    console.log(`New Filter => ${filtersArray}/${filter.dataKey}[${filter.dType}]`)
    setQueryLines((current)=>{
      const currentCopy = [...current];
      const query = {
        queryKey:filter.dataKey,
        dataKey:filter.text,
        dType:filter.dType,
        path:filtersArray
      }
      currentCopy.push(query);
      return currentCopy;
    })
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
    <Stack
      direction="column"
      minHeight={0}
      minWidth={0}
      justifyContent={"stretch"}
      sx={{
        height:'100%'
      }}
    >
      {
        queryLines.map((query, index) => {// Last element is the query key 
          
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
