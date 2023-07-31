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
  const blockBackgroundColors = [
    "red",
    "lightyellow",
    "grey",
    "whitesmoke",
    "brown",
    "yellow",
    "orange"
  ];
  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [queryObjects, setQueryObjects] = React.useState({});
  let [queryBlockColors, setQueryBlockColors] = React.useState(blockBackgroundColors);

  

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
    const dict = convertStringToDict([...filtersArray, `${filter.text}|${filter.dataKey}|${filter.dType}`]);
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
      container
      id="queryBuilderScaffold"
    >
      <Stack
        id="queryBuilderContainer"
        
      >
        <Stack className="queryBuilder" spacing={1}>
          {
            Object.keys(queryObjects).map((queryObject, index) => {// Last element is the query key 
              queryBlockColors = [...blockBackgroundColors];
              return (
                <div className="queryBlock">
                  <QueryBlock 
                    queryObjects={queryObjects[queryObject]}
                    parent={queryObject}
                    key={index}
                    index={index}
                    backgroundColors={queryBlockColors}
                    setBackgroundColors={setQueryBlockColors}
                  />
                </div>)
            })
          }
          <Box sx={{margin:'0', padding:'0'}}>
            <AddFilterButton // Open Dialog to add new companies filter
              toggleFiltersDialog={toggleFiltersDialog}
              className={
                Object.keys(queryObjects).length > 0 &&
                "blockWithConnectors addFilterButton"
              }
            />
          </Box>
        </Stack>
      </Stack>
      <Grid
      
        direction="column"
        container
        sx={{
          height:'60%',
          backgroundColor:'grey',
          
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
