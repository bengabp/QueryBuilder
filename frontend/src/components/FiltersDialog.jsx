import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';


export default function FiltersDialog() {
  const [open, setOpen] = React.useState(false);
  const filters = [
    "Basic Info",
    "Investor Details",
    "School Details",
    "Industries",
    "Team",
    "Funding",
    "Acquisitions",
    "M&A",
    "IPO & Stock Price",
    "Signals",
    "Events",
    "Rank & Scores",
    "Similar Companies",
    "Contacts",
    "Web Traffic by SEMursh",
    "Website Tech Stack by BuildWith"
  ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
            <Stack>
                <Typography>Edit Filters</Typography>
                <IconButton>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Stack>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack sx={{ height: '300px', overflowY: 'auto'}} direction="column">
                            
                        {/* Scrollable content in the second div */}
                        {filters.map((filter, index) => {
                            return <Button variant="string">{filter}</Button>
                        })}
                        {/* ...more content */}
                    
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack sx={{ height: '300px', overflowY: 'auto' }} direction="column">
                        
                        {/* Scrollable content in the second div */}
                        {filters.map((filter, index) => {
                            return <Button variant="string">{filter}</Button>
                        })}
                        {/* ...more content */}
                       
                    </Stack>
                </Grid>
            </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
