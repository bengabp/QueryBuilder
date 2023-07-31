import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OptionBlock from './OptionBlock';
import Stack from "@mui/material/Stack";
// import ValueBlock from './ValueBlock';
import MyAutocompleteTextField from './ValueBlock';
import { dataTypesAndOptions } from '../../constants/options';



export default function LastBlock(props) {
    let className = `blockWithConnectors ${props.blockClassName}`;
    if (props.index == 0){
        className += ` noUpLine`
    }

    const [text, dataKey, dType] = props.text.split("|");

    return (
        <Stack 
            direction="row"
            style={{
                display:'flex',
                gap:'15px'
            }}
        >
            <Box className={className}>
                <div className="first"></div>
                <div className="second"></div>

                <Button 
                    sx={{
                        backgroundColor:'#4f98e03d'
                    }}
                    className="optionsButton"
                >
                    {
                        text
                    }
                </Button>
            </Box>
            <OptionBlock
                options={dataTypesAndOptions[dType]}
            ></OptionBlock>
            <MyAutocompleteTextField>

            </MyAutocompleteTextField>
        </Stack>
    );
}