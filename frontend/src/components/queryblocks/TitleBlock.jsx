import React, {
    useState
} from 'react';
import { Button, Typography, Box } from '@mui/material';


const TitleBlock = (props) => {
    return (
        <Box className="titleBlock blockWithConnectors">
            <Button 
                variant='contained'
                color='primary'
            >
                {props.text}
            </Button>
        </Box>
    )
}

export default TitleBlock