import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import FilterBlock from './filterblocks/FilterBlock';


export default function FiltersDialog(props) {
  let currentFilterKey = props.currentFilterKey;
  let currentFirstPanelFilters = props.currentFirstPanelFilters;
  let currentSecondPanelFilters = props.currentSecondPanelFilters;
  let filterBreadCrumbs = props.filterBreadCrumbs;
  let filterTransitionHistory = props.filterTransitionHistory;
  const stackRef = React.useRef(null);
  let previousPanelFilters = [];


  const handleClose = () => {
    props.setFiltersDialogIsOpen(false);
  };

  const onFirstPanelFilterBlockClicked = (clickText) => {
    // Code logic when user clicks blocks on the first panel
    currentFilterKey = clickText;
    previousPanelFilters = props.currentFirstPanelFilters
    currentSecondPanelFilters = props.currentFirstPanelFilters[currentFilterKey];
    props.setSecondPanelFilters(currentSecondPanelFilters);
    props.setCurrentFilterKey(currentFilterKey)

    console.log(filterBreadCrumbs);
    console.log(previousPanelFilters);
    if (filterBreadCrumbs.length > 0){
      filterBreadCrumbs[filterBreadCrumbs.length-1] = currentFilterKey
      props.setFilterBreadCrumbs(filterBreadCrumbs);
    }
  }

  const onSecondPanelFilterBlockClicked = (clickedText) => {
     // Code logic when user clicks blocks on the second panel
    console.log(clickedText);
    currentFilterKey = clickedText 

    if (filterBreadCrumbs.length > 0){
      const lastBreadCrumb = filterBreadCrumbs[filterBreadCrumbs.length-1]
      if (lastBreadCrumb.toLowerCase() !== currentFilterKey.toLowerCase()){
        filterBreadCrumbs.push(currentFilterKey);
        props.setFilterBreadCrumbs(filterBreadCrumbs);
      }
    } 
    // props.currentFilterKey = clickedText;
    // props.currentFirstPanelFilters = props.currentFirstPanelFilters[props.currentFilterKey];
    // props.setCurrentFilterKey(props.currentFilterKey);
    // props.setFirstPanelFilters(props.currentFirstPanelFilters);

  }

  React.useEffect(() => {
    // Scroll to the right end when a new breadcrumb is added
    if (stackRef.current){
      stackRef.current.scrollLeft = stackRef.current.scrollWidth;
    }
  }, [filterBreadCrumbs]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.filtersDialogIsOpen}
        onClose={handleClose}
        sx={{padding:0}}
      >
        <AppBar position="sticky" sx={{display:'flex',
          flexDirection:"row",
          alignItems:'center', justifyContent:"space-between", paddingRight:'20px'}}>
          <Toolbar disableGutters={false}>
            <Typography variant="h5" fontWeight="bold">Edit Filters</Typography>
          </Toolbar>
          <IconButton onClick={handleClose} sx={{
              color:'white'
            }}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </AppBar>
 
        <Container sx={{marginTop:'10px'}}>
          <Stack direction="row" sx={{
              overflowX:"scroll",
              whiteSpace:"nowrap",
            }}
            divider={<NavigateNextIcon />}
            alignItems="center"
          >
            {props.filterBreadCrumbs.map((breadCrumb, index) => {
              return <Button
                variant="text"
                key={index}
                style={{
                  textTransform:'capitalize',
                  textAlign:'left',
                  whiteSpace:'nowrap',
                  flexShrink:'0'
                }}
                onClick={() => {console.log("haha");}}
              >{breadCrumb}</Button>
            })}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack sx={
                { height: '300px',
                  overflowY: 'auto'
                }} direction="column"
                alignItems="stretch"
              >
                {Array.isArray(props.currentFirstPanelFilters) ?
                  props.currentFirstPanelFilters.map((filter, index) => {
                    return <FilterBlock 
                      text={filter}
                      key={index}
                      onClick={onFirstPanelFilterBlockClicked}
                    />
                  })
                :
                  Object.keys(props.currentFirstPanelFilters).map((filter, index) => {
                      return <FilterBlock 
                        text={filter}
                        key={index}
                        hasNextIcon={true}
                        onClick={onFirstPanelFilterBlockClicked}
                      />
                })}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ height: '300px', overflowY: 'auto', overflowX:"hidden" }} direction="column">
                {Array.isArray(props.currentSecondPanelFilters) ?
                  props.currentSecondPanelFilters.map((filter, index) => {
                    return <FilterBlock 
                      text={filter}
                      key={index}
                      hasNextIcon={false}
                      onClick={()=>{
                        props.onFilterSelect(filter)
                      }}
                    />
                  })
                :
                  Object.keys(props.currentSecondPanelFilters).map((filter, index) => {
                      return <FilterBlock 
                        text={filter}
                        key={index}
                        hasNextIcon={true}
                        onClick={onSecondPanelFilterBlockClicked}
                      />
                })}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
