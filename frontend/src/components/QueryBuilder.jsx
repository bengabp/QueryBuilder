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
  const [queryLines, setQueryLines] = React.useState([]);
  const [queryList, setQueryList] = React.useState([]); 
  let [queryObjects, setQueryObjects] = React.useState({});

  /* 
    const querySchema = {
      queryKey:"Name",
      dataKey:'real_db_value",
      dType:"number",
      path:['basic_info']
      
      
    }
  */
  React.useEffect(()=>{
    console.log(queryObjects);
  }, [queryObjects]);
  
  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1){
      filtersArray.pop();
    }
    toggleFiltersDialog(false);
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
    
    const dict = convertStringToDict([...filtersArray, filter.dataKey]);
    const merged = mergeDicts(queryObjects, dict)
    setQueryObjects(merged);
  }

  function mergeDicts(dict1, dict2) {
    const mergedDict = { ...dict1 }; // Create a shallow copy of dict1
  
    for (const [key, value] of Object.entries(dict2)) {
      if (key in mergedDict && typeof mergedDict[key] === 'object' && typeof value === 'object') {
        // Recursively merge nested objects
        mergedDict[key] = mergeDicts(mergedDict[key], value);
      } else {
        mergedDict[key] = value;
      }
    }
  
    return mergedDict;
  }


  function convertStringToDict(keysValues) {
    const result = {};
    let currentDict = result;
  
    for (let i = 0; i < keysValues.length; i++) {
      const key = keysValues[i];
      if (i === keysValues.length - 1) {
        currentDict[key] = key;
      } else {
        currentDict[key] = {};
        currentDict = currentDict[key];
      }
    }
  
    return result;
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
    <Grid
      direction="column"
      sx={{
        height:'100vh',
        margin:'0'
      }}
      container
    >
      <Stack
        sx={{
          height:'40%',
          overflow:'scroll',
          paddingLeft:'30px',
          justifyItems:"center"
        }}
        spacing={2}
      >
        {
          Object.keys(queryObjects).map((queryObject, index) => {// Last element is the query key 
            return <QueryBlock 
              queryObjects={queryObjects[queryObject]}
              parent={queryObject}
              key={index}
            />
          })
        }
        <Box sx={{margin:'0', padding:'0'}}>
          <AddFilterButton // Open Dialog to add new companies filter
            toggleFiltersDialog={toggleFiltersDialog}
          />
        </Box>
      </Stack>
      <Grid
      
        direction="column"
        container
        sx={{
          height:'60%',
          backgroundColor:'red',
          
        }}
      >
      </Grid>
      <FiltersDialog
        toggleFiltersDialog={toggleFiltersDialog}
        filtersDialogState={filtersDialogState}
        filterKeysHistory={filterKeysHistory}
        setFilterKeysHistory={setFilterKeysHistory}
        onNewFilter={onNewFilter}
        onNavBlockClicked={onNavBlockClicked}
      ></FiltersDialog>
    </Grid>
  );
}
