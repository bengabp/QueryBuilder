import React, {
    useState
} from 'react';
import { Button, Typography, Box } from '@mui/material';


const TitleBlock = (props) => {
    return (
        <Box className={"blockWithConnectors " + props.blockClassName}>
            <div className="first"></div>
            <div className="second"></div>
            <Button 
                variant='contained'
                color='primary'
            >
                {
                    props.text
                }

            </Button>
        </Box>
    )
}

export default TitleBlock