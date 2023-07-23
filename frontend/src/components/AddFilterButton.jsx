import  * as Material from '@mui/material';
import React from 'react';


export default function AddFilterButton(props){
    return(
        <Material.Button onClick={(event) => {
            props.toggleFiltersDialog(true);
        }}>Add Companies Filter</Material.Button>
    );
} 