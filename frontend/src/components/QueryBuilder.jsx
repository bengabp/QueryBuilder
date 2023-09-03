import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';
import QueryBlock from './QueryBlock';
import SearchResultsTable from './SearchResultsTable';
import LinearProgress from '@mui/material/LinearProgress';
import { SettingsContext } from '../contexts/SettingsContext';
import { api_uri } from './queryblocks/AutocompleteField';
import mergeObjectWithNestedArray from "./utils";



export default function QueryBuilder(props) {
  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [queryObjects, setQueryObjects] = React.useState({});
  const [requestQueries, setRequestQueries] = React.useState({});
  const [isSearching, setIsSearching] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const [queryValues, setQueryValues] = React.useState({});
  const [queryCurrentOptions, setQueryCurrentOptions] = React.useState({})
  const [queries, setQueries] = React.useState({}) // Tree of queries
  
  const settings = React.useContext(SettingsContext);
  const [searchResults, setSearchResults] = React.useState(settings.companies);

  const [exportBtnMenuAnchorEl, setExportBtnMenuAnchorEl] = React.useState("");
  const exportBtnMenuOpen = Boolean(exportBtnMenuAnchorEl);

  const handleExportBtnMenuItemClick = (event) => setExportBtnMenuAnchorEl(event.currentTarget)
  const handleExportBtnMenuClose = (event) => {
    const fileType = event.currentTarget.id;
    if (["json", "csv"].includes(fileType)){
      sendExportRequest(fileType);
    }
    setExportBtnMenuAnchorEl("");
  }


  React.useEffect(() => {
    props.setIsLoading(false);
  },[])

  const sendExportRequest = (fileType) => {
    setIsExporting(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`${api_uri}/export`, {
        body: JSON.stringify({
          targetResults: searchResults.results,
          fileType: fileType
        }),
        redirect: "follow",
        headers: myHeaders,
        method: "POST"
      },
    )
    .then((response) => response.blob())
    .then((blob) => {
      setIsExporting(false);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', "results."+fileType);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => {
      console.error('Error downloading file: ', error);
      setIsExporting(false)
    });
  }

  React.useEffect(() => {
    console.log("QueryTree: ", queries)
  }, [queries])
  
  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1){
      filtersArray.pop();
    }
    toggleFiltersDialog(false);  // Close filters dialog   
    // Convert last querykey details to json string so it can be parsed and converted back to a js object
    const jsonData = {
      dataKey:filter.dataKey,
      dType:filter.dType,
      text: filter.text,
      parents: [...filtersArray],
    }
    const jsonString = JSON.stringify(jsonData)
    const strKey = [...filtersArray, filter.dataKey].join(".")
    const queryTree = mergeObjectWithNestedArray(queries, strKey.split("."), jsonString)
    setQueries(queryTree)
    setQueryCurrentOptions((current) => {
      const prev = {...current};
      prev[strKey] = settings.dataTypesAndOptions[filter.dType].options[0]
      return prev;
    })
    setQueryValues((current) => {
      const prev = {...current};
      prev[strKey] = [];
      return prev;
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
              setSearchResults(result)
            })
      } catch (err) {
          console.log(err)
      } finally {
        setIsSearching(false);
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
            Object.keys(queries).map((queryChild, index) => { // Last element is the query key
              return (
                  <div className="queryBlock" key={index}>
                    <QueryBlock
                        queries={queries[queryChild]}
                        parent={queryChild}
                        index={index}
                        queryCurrentOptions={queryCurrentOptions}
                        queryValues={queryValues}
                        setQueryCurrentOptions={setQueryCurrentOptions}
                        setQueryValues={setQueryValues}
                    />
                  </div>
              )
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
          <Box
            sx={{
              display:"flex",
              flexDirection:"column",
              gap:"0px",
              alignItems:"center",
              justifyContent:"center"
            }}
          >
              <Button
                disabled={true ? isExporting: false}
                id={"export-btn"}
                aria-controls={exportBtnMenuOpen ? 'export-btn-menu' : undefined}
                aria-haspopup={"true"}
                aria-expanded={exportBtnMenuOpen ? 'true' : undefined}
                onClick={handleExportBtnMenuItemClick}
              >
                {isExporting ? "Exporting..." : "Export Results"}
            </Button>
            {isExporting && <LinearProgress sx={{width:"120px", height:"3px"}} />}
          </Box>

          <Menu
              id="export-btn-menu"
              anchorEl={exportBtnMenuAnchorEl}
              open={exportBtnMenuOpen}
              onClose={handleExportBtnMenuClose}
              MenuListProps={{'aria-labelledby': 'export-btn'}}
          >
            <MenuItem onClick={handleExportBtnMenuClose} id="json">Export to json</MenuItem>
            <MenuItem onClick={handleExportBtnMenuClose} id="csv">Export to csv</MenuItem>
          </Menu>
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
