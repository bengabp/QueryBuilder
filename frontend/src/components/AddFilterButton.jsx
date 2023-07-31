import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';


export default function AddFilterButton(props){
    return(
        <Box className={props.className}>
            <Button onClick={(event) => {
                props.toggleFiltersDialog(true);
            }}
            variant="contained"
            >Add Companies Filter</Button>
        </Box>
    );
} 