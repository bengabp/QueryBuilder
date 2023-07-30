import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function LastBlock(props) {
    let className = `blockWithConnectors ${props.blockClassName}`;
    if (props.index == 0){
        className += ` noUpLine`
    }

    const [text, dataKey, dType] = props.text.split("|");

    return (
        <Box className={className}>
            <div className="first"></div>
            <div className="second"></div>
            <Button sx={{
                backgroundColor:'#4f98e03d'
            }}>
                {
                    text
                }
            </Button>
        </Box>
    );
}