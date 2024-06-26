import React from 'react';
import { AppBar, Toolbar, Typography, Box, LinearProgress } from '@mui/material';

const HomeAppBar  = (props) => {

    return (
        <Box>
            <AppBar position='static'
                sx={{
                    minHeight:"50px"
                }}
                
            >
                <Toolbar style={{minHeight:'50px'}}>
                    <Typography variant='h5' fontWeight="bold">Companies Query Builder</Typography>
                </Toolbar>
            </AppBar>
            {props.isLoading && <LinearProgress />}
        </Box>
    );
    
}

export default HomeAppBar
