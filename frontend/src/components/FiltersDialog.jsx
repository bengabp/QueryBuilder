import CloseIcon from '@mui/icons-material/Close';
import NavigateNext from '@mui/icons-material/NavigateNext';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import FirstPanel from './filterpanels/FirstPanel';
import SecondPanel from './filterpanels/SecondPanel';

import { filterKeyIndices } from '../constants/filters';

export default function FiltersDialog(props) {

  const closeFiltersDialog = () => {
    props.toggleFiltersDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.filtersDialogState}
        onClose={closeFiltersDialog}
        sx={{padding:0}}
      >
        <AppBar position="sticky" sx={{display:'flex',
          flexDirection:"row",
          alignItems:'center', justifyContent:"space-between", paddingRight:'20px'}}>
          <Toolbar disableGutters={false}>
            <Typography variant="h5" fontWeight="bold">Edit Filters</Typography>
          </Toolbar>
          <IconButton onClick={closeFiltersDialog} sx={{
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
            divider={<NavigateNext />}
            alignItems="center"
          >
            {filterKeyIndices[props.filterKeysHistory[props.filterKeysHistory.length-1]].map((breadCrumb, index) => {
                return <Button
                    variant="text"
                    key={index}
                    style={{
                        textTransform:'capitalize',
                        textAlign:'left',
                        whiteSpace:'nowrap',
                        flexShrink:'0',
                        backgroundColor:'#4f98e03d'
                    }}
                    onClick={props.onNavBlockClicked}
                >{breadCrumb}</Button>
              })
            }
          </Stack>
          <Grid container spacing={2}>
            <FirstPanel
              filterKeysHistory={props.filterKeysHistory}
              setFilterKeysHistory={props.setFilterKeysHistory}
              onNewFilter={props.onNewFilter}
            ></FirstPanel>
            <SecondPanel
              filterKeysHistory={props.filterKeysHistory}
              setFilterKeysHistory={props.setFilterKeysHistory}
              secondPanelFilters={props.secondPanelFilters}
              onNewFilter={props.onNewFilter}
            ></SecondPanel>
          </Grid>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}


