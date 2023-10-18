import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
// import { ValueContext } from "../contexts/ValueContext";
import NavigateNext from '@mui/icons-material/NavigateNext';
import NavigateBefore from "@mui/icons-material/NavigateBefore";



export default function QueryBuilder(props) {
  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const [queryValues, setQueryValues] = React.useState([]);
  const [queryCurrentOptions, setQueryCurrentOptions] = React.useState({})
  const [queries, setQueries] = React.useState({}) // Tree of queries

  const settings = React.useContext(SettingsContext);
  const [searchResults, setSearchResults] = React.useState(settings.companies);

  const [exportBtnMenuAnchorEl, setExportBtnMenuAnchorEl] = React.useState("");
  const exportBtnMenuOpen = Boolean(exportBtnMenuAnchorEl);

  const [paginationFilters, setPaginationFilters] = React.useState([])
  const [selectedRows, setSelectedRows] = React.useState([])

  const handleExportBtnMenuItemClick = (event) => setExportBtnMenuAnchorEl(event.currentTarget)
  const handleExportBtnMenuClose = (event) => {
    const fileType = event.currentTarget.id;
    if (["json", "csv"].includes(fileType)) {
      sendExportRequest(fileType);
    }
    setExportBtnMenuAnchorEl("");
  }



  React.useEffect(() => {
    props.setIsLoading(false);
  }, [])

  const getSelectedRowResults = (all_results) => {
    // Iterate through the selectedRows array and get them in the searchResults.results array
    
    if (selectedRows.length > 0){
      let selectedResults = all_results.filter(
        result => selectedRows.includes(result.id)
      );
      return selectedResults

    } else {
      return all_results
    }
  }

  const sendExportRequest = (fileType) => {
    setIsExporting(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`${api_uri}/export`, {
      body: JSON.stringify({
        targetResults:getSelectedRowResults(searchResults.results),
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
        link.setAttribute('download', "results." + fileType);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file: ', error);
        setIsExporting(false)
      });
  }

  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1) {
      filtersArray.pop();
    }
    toggleFiltersDialog(false);  // Close filters dialog   
    // Convert last querykey details to json string so it can be parsed and converted back to a js object
    const jsonData = {
      dataKey: filter.dataKey,
      dType: filter.dType,
      text: filter.text,
      parents: [...filtersArray],
    }
    const jsonString = JSON.stringify(jsonData)
    const strKey = [...filtersArray, filter.dataKey].join(".")
    const queryTree = mergeObjectWithNestedArray(queries, strKey.split("."), jsonString)
    setQueries(queryTree)
    setQueryCurrentOptions((current) => {
      const prev = { ...current };
      prev[strKey] = settings.dataTypesAndOptions[filter.dType].options[0]
      return prev;
    })
    setQueryValues((current) => {
      const prev = { ...current };
      prev[strKey] = [];
      return prev;
    })
  }

  const onNavBlockClicked = () => {
    setFilterKeysHistory((current) => {
      if (current.length > 1) {
        const currentCopy = [...current];
        currentCopy.pop();
        return currentCopy;
      } else {
        return current
      }
    })
  }


  async function search(event) {
    let queries = [];
    if (Object.keys(queryValues).length > 0){
      Object.keys(queryValues).forEach((key) => {
        const values = queryValues[key]
        const currentOption = queryCurrentOptions[key]
        queries.push({
          query: key,
          values: values,
          currentOption: currentOption
        })
      })
    } 

    setIsSearching(true);
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      const filters = JSON.stringify({ filters: queries })
      await fetch(`${api_uri}/search`, {
        method: 'POST',
        headers: headers,
        body: filters,
        redirect: 'follow'
      }).then(response => response.json())
        .then(result => {
          setSearchResults(result)
          setPaginationFilters(queries)
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsSearching(false);
    }
  }

  const onFilterRemove = (strKey) => { 
    setQueries((current) => {
      let prev = { ...current }
      deleteNestedKey(prev, strKey)
      return prev
    });
  }
  
  function deleteNestedKey(obj, path) {
    const keys = path.split('.');
    if (window.UndefinedVariable) {
      Object.assign(window.UndefinedVariable, {})
    }

    if (keys.length === 4) {
      if (Object.keys(obj[keys[0]][keys[1]][keys[2]]).length > 1) {
        delete obj[keys[0]][keys[1]][keys[2]][keys[3]]
      } else if (Object.keys(obj[keys[0]][keys[1]]).length > 1) {
        delete obj[keys[0]][keys[1]][keys[2]]
      } else if (Object.keys(obj[keys[0]][keys[1]][keys[2]]).length === 1) {
        delete obj[keys[0]]
      } else {
        delete obj[keys[0]]
      }
    }

    if (keys.length === 3) {
      if (Object.keys(obj[keys[0]][keys[1]]).length > 1) {
        delete obj[keys[0]][keys[1]][keys[2]]
      } else if (Object.keys(obj[keys[0]][keys[1]]).length === 1) {
        delete obj[keys[0]]
      } 
    }

    if (keys.length === 2) {
      if (Object.keys(obj[keys[0]]).length > 1) {
        delete obj[keys[0]][keys[1]]
      } else {
        delete obj[keys[0]]
      }
    }
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
                    onFilterRemove={onFilterRemove}
                    setQueryCurrentOptions={setQueryCurrentOptions}
                    setQueryValues={setQueryValues}
                  />
                </div>
              )
            })
          }
          <Box sx={{ margin: '0', padding: '0' }}>
            <AddFilterButton // Open Dialog to add new companies filter
              toggleFiltersDialog={toggleFiltersDialog}
              isSearching={isSearching}
              className={
                Object.keys(queries).length > 0 &&
                "blockWithConnectors addFilterButton"
              }
            />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="column" sx={{
        position: 'fixed',
        bottom: '0px',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        <Box sx={{ width: '100%' }}>
          {isSearching && <LinearProgress />}
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
            <Typography>{`${selectedRows.length} rows selected`}</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: "50px"
          }}>
            <Stack 
              direction="row"
              sx={{
                alignItems: "center",
                flexDirection: "row",
                gap: "10px"
              }}
            >
              <Typography variant="span">{`${searchResults.index+1} - ${searchResults.index + searchResults.resultsPerPage >= searchResults.totalResults? searchResults.totalResults : searchResults.index+searchResults.resultsPerPage} of ${searchResults.totalResults}`}</Typography>
              <Box sx={{
                display:"flex",
                flexDirection:"row",
                gap:"10px",
                alignItems:"center"
              }}>
                <PaginationButton direction="prev" 
                  setIsSearching={setIsSearching}
                  paginationFilters={paginationFilters}
                  currentIndex={searchResults.index}
                  pageSize={searchResults.resultsPerPage}
                  totalSearchResults={searchResults.totalResults}
                  setSearchResults={setSearchResults}
                />
                <PaginationButton direction="next" 
                  setIsSearching={setIsSearching}
                  paginationFilters={paginationFilters}
                  currentIndex={searchResults.index}
                  pageSize={searchResults.resultsPerPage}
                  totalSearchResults={searchResults.totalResults}
                  setSearchResults={setSearchResults}
                />
              </Box>
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                disabled={true ? isExporting || searchResults.results.length === 0 : false}
                id={"export-btn"}
                aria-controls={exportBtnMenuOpen ? 'export-btn-menu' : undefined}
                aria-haspopup={"true"}
                aria-expanded={exportBtnMenuOpen ? 'true' : undefined}
                onClick={handleExportBtnMenuItemClick}
              >
                {isExporting ? "Exporting..." : "Export Results"}
              </Button>
              {isExporting && <LinearProgress sx={{ width: "120px", height: "3px" }} />}
            </Box>
          </Box>

          <Menu
            id="export-btn-menu"
            anchorEl={exportBtnMenuAnchorEl}
            open={exportBtnMenuOpen}
            onClose={handleExportBtnMenuClose}
            MenuListProps={{ 'aria-labelledby': 'export-btn' }}
          >
            <MenuItem onClick={handleExportBtnMenuClose} id="json">Export to json</MenuItem>
            <MenuItem onClick={handleExportBtnMenuClose} id="csv">Export to csv</MenuItem>
          </Menu>
        </Box>
        <SearchResultsTable 
          companies={searchResults.results} 
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
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


const PaginationButton = (props) => {
  const doPagination = async () => {
    // Calculate index
    // if direction is prev and index > 0. index = currentIndex - pagesize
    
    let requestIndex = 0;
  
    if (props.direction === "prev"){
      if (props.currentIndex > 0){
        requestIndex = props.currentIndex - props.pageSize;
      }
    } else if (props.direction === "next"){
      requestIndex = (props.currentIndex + props.pageSize)
    }

    // Send Api request
    props.setIsSearching(true);
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      const filters = JSON.stringify({ filters: props.paginationFilters.length > 0 ? props.paginationFilters:[] })
      await fetch(`${api_uri}/search?index=${requestIndex}`, {
        method: 'POST',
        headers: headers,
        body: filters,
        redirect: 'follow'
      }).then(response => response.json())
        .then(result => {
          props.setSearchResults(result)
        })
    } catch (err) {
      console.error(err)
    } finally {
      props.setIsSearching(false);
    }
    
  }

  let isDisabled = false;
  if (props.direction==="next"){
    if (props.currentIndex + props.pageSize >= props.totalSearchResults){
      isDisabled = true;
    }
  }

  return (
    <IconButton
      onClick={doPagination}
      disabled={isDisabled}
    >
      {
        props.direction === "prev" 
        ? 
          <NavigateBefore></NavigateBefore> 
        : 
          <NavigateNext></NavigateNext>
      }
    </IconButton>
  );
}