import React, {
    useState
} from 'react';
import { Button, Typography, Box } from '@mui/material';
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";



const TitleBlock = (props) => {
    return (
        <Box className="blockWithConnectors">
            <Button 
                variant='contained'
                element="span"
                color='primary'
            >
                {props.text}
            </Button>
        </Box>
    )
}

export default TitleBlock