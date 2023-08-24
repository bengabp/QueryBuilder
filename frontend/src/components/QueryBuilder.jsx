import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';
import QueryBlock from './QueryBlock';
import SearchResultsTable from './SearchResultsTable';
import LinearProgress from '@mui/material/LinearProgress';
import { SettingsContext } from '../contexts/SettingsContext';
import { api_uri } from './queryblocks/AutocompleteField';


export default function QueryBuilder(props) {
  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [queryObjects, setQueryObjects] = React.useState({});
  const [requestQueries, setRequestQueries] = React.useState({});
  const [isSearching, setIsSearching] = React.useState(false);
  
  const settings = React.useContext(SettingsContext);
  const [searchResults, setSearchResults] = React.useState(settings.companies);


  React.useEffect(() => {
    props.setIsLoading(false);
  },[])


  React.useEffect(()=>{
    let dict = {};
    
    Object.keys(requestQueries).forEach((item, index) => {
      let list = item.split(".");
      list[list.length-1] = requestQueries[item]
      const listDict = convertStringToDict(list);
      dict = mergeDicts(dict, listDict);
    })
    setQueryObjects(dict);
    console.log("requestQueries => ",requestQueries);
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
      currentOption: settings.dataTypesAndOptions[filter.dType].options[0],
      values:[]
    })

    const longQueryString = [...filtersArray, filter.dataKey].join(".")
    setRequestQueries((current) => {
      const currentQueries = {...current}
      currentQueries[longQueryString] = jsonString
      return currentQueries;
    });
    
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


  async function search (event) {
    if (Object.keys(requestQueries).length > 0){
      setIsSearching(true);
      try {
        // Fetch the settings from the backend API
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          let rawData = Object.keys(requestQueries).map(
            (filterKey, index) => JSON.parse(requestQueries[filterKey])
          )
          var raw = JSON.stringify({
            filters: rawData
          });
          
          await fetch(`${api_uri}/search`, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => {
              setIsSearching(false);
              setSearchResults(result)
            })
      } catch (err) {
          console.log(err)
      } finally {
        
      }
    }
  }

  const onFilterRemove = (query) => {
      
      setRequestQueries((prev)=>{
        let current = {...prev}
        delete current[query]
        return current
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
        sx={{}}
      >
        <Stack className="queryBuilder" spacing={1} marginBottom={"10px"}>
          {
            Object.keys(queryObjects).map((queryObject, index) => {// Last element is the query key 
              return (
                <div className="queryBlock" key={index}>
                  <QueryBlock 
                    queryObjects={queryObjects[queryObject]}
                    parent={queryObject}
                    index={index}
                    requestQueries={requestQueries}
                    setRequestQueries={setRequestQueries}
                    onFilterRemove={onFilterRemove}
                  />
                </div>)
            })
          }
          <Box sx={{margin:'0', padding:'0'}}>
            <AddFilterButton // Open Dialog to add new companies filter
              toggleFiltersDialog={toggleFiltersDialog}
              isSearching={isSearching}
              className={
                Object.keys(queryObjects).length > 0 &&
                "blockWithConnectors addFilterButton"
              }
            />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="column" sx={{
          position:'fixed',
          bottom: '0px',
          height:'50%',
          display:'flex',
          flexDirection: 'column',
          width:'100%'
        }}>
        <Box sx={{width:'100%'}}>
          { isSearching && <LinearProgress />}
        </Box>
        <Box
          display="flex"
          justifyContent={"space-between"}
          padding={"8px 20px"}
          borderBottom={"1px solid #808080a1"}
        >
          <Box display={'flex'} alignItems={"center"} gap={"20px"}>
            <Button variant="contained"
              onClick={search}
              disabled={isSearching}
            >SEARCH</Button>
            <Typography variant="span">{`${searchResults.totalResults} results`}</Typography>
          </Box>
          <Button variant="contained">Export Companies</Button>
        </Box>
        <SearchResultsTable 
          companies={searchResults.results}
        />
      </Stack>
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
