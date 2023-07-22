import  * as Material from '@mui/material';
import React from 'react';


export default function AddFilterButton(props){
    return(
        <Material.Button variant="contained" onClick={(event) => {
            props.setFiltersDialogIsOpen(true);
        }}>Add Companies Filter</Material.Button>
    );
} 