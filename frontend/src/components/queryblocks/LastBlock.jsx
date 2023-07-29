import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function LastBlock(props) {
    return (
        <Box className="blockWithConnectors">
            <Button sx={{
                backgroundColor:'#4f98e03d'
            }}>
                <Typography
                    textAlign="left"
                    textTransform="lowercase"
                >{props.text}</Typography>
            </Button>
        </Box>
    );
}