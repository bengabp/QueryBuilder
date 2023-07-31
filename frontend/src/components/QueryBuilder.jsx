import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';
import QueryBlock from './QueryBlock';
import { dataTypesAndOptions } from '../constants/options';


export default function QueryBuilder(props) {
  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [queryObjects, setQueryObjects] = React.useState({});
  const [onQueryOptionSelect, setQueryOptionSelect] = React.useState("");
  const [onQueryLineDelete, setQueryLineDelete] = React.useState("");
  const [requestQueries, setRequestQueries] = React.useState({});

  React.useEffect(()=>{
    let dict = {};
    Object.keys(requestQueries).forEach((item, index) => {
      let list = item.split(".");
      list[list.length-1] = requestQueries[item]
      const listDict = convertStringToDict(list);
      dict = mergeDicts(dict, listDict);
    })
    setQueryObjects(dict);
  }, 
  [requestQueries]);

  
  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1){
      filtersArray.pop();
    }
    toggleFiltersDialog(false);  // Close filters dialog   
    // Convert last querykey details to json string so it can be parsed and converted back to a js object
    const jsonString = JSON.stringify({
      dataKey:filter.dataKey,
      dType:filter.dType,
      text: filter.text,
      parents: [...filtersArray],
      currentOption: dataTypesAndOptions[filter.dType][0],
      values:[]
    })

    const longQueryString = [...filtersArray, filter.dataKey].join(".")
    setRequestQueries((current) => {
      const currentQueries = {...current}
      currentQueries[longQueryString] = jsonString
      return currentQueries;
    });

    // const dict = convertStringToDict([...filtersArray, jsonString]);
    // const merged = mergeDicts(queryObjects, dict)
    // setQueryObjects(merged);
    

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

  const onOptionSelect = (path, option) => {
    console.log(option);
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
              return (
                <div className="queryBlock">
                  <QueryBlock 
                    queryObjects={queryObjects[queryObject]}
                    parent={queryObject}
                    key={index}
                    index={index}
                    requestQueries={requestQueries}
                    setRequestQueries={setRequestQueries}
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
          height:'0%',
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
