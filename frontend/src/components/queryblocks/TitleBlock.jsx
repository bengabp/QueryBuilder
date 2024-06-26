import React, {
    useState
} from 'react';
import { Button, Typography, Box } from '@mui/material';
import { SettingsContext } from '../../contexts/SettingsContext';


const TitleBlock = (props) => {
    const settings = React.useContext(SettingsContext);
    const keyList = settings.filterKeyIndices[props.text];
    const lastText = keyList[keyList.length-1]

    let className = `blockWithConnectors ${props.blockClassName}`;
    if (props.index == 0){
        className += ` noUpLine`;
    }

    return (
        <Box className={className}>
            <div className="first"></div>
            <div className="second"></div>
            <Button 
                variant='contained'
                color='primary'
            >
                {
                    lastText
                }

            </Button>
        </Box>
    )
}

export default TitleBlock