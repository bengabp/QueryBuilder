import React from 'react';
import Button from '@mui/material/Button';
import { filterKeyIndices } from '../../constants/filters';


export default function SubQueryBlock (props){
    return (
        <Button 
            variant="contained"
            element="span"
            style={{
                textTransform:'capitalize',
                display: 'flex',
                textOverflow:'ellipsis',
                justifyContent: 'space-between',
                whiteSpace:'nowrap',
                width:'180px'
            }}
        >
            {props.text}
        </Button>
    );
}

