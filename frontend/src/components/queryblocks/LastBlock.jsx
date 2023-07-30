import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material';


export default function LastBlock(props) {
    return (
        <Box className='lastBlock blockWithConnectors'>
            <Button sx={{
                backgroundColor:'#4f98e03d'
            }}>
                {props.text}
            </Button>
        </Box>
    );
}