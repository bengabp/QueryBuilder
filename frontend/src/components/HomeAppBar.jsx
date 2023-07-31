import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

class HomeAppBar extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <AppBar position='static'
                sx={{}}
            >
                <Toolbar>
                    <Typography variant='h5' fontWeight="bold">Companies Query Builder</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default HomeAppBar
