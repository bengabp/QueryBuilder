import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OptionBlock from './OptionBlock';
import Stack from "@mui/material/Stack";
import {SettingsContext} from '../../contexts/SettingsContext';
import DynamicValuesBlock from './ValueBlock';



export default function LastBlock(props) {
    let className = `blockWithConnectors ${props.blockClassName}`;
    const settings = React.useContext(SettingsContext);
    if (props.index == 0){
        className += ` noUpLine`
    }

    const queryObject = JSON.parse(props.text);
    const text = queryObject.text;
    const dataKey = queryObject.dataKey;
    const parentsList = queryObject.parents
    const dType = queryObject.dType

    console.log("Request Queries => ",props.requestQueries);

    const [values, setValues] = React.useState([]);

    /* 
        requestQueries={props.requestQueries}
        etRequestQueries={props.setRequestQueries}

    */
    const onOptionSelect = (option) => {
        const query = [...parentsList, dataKey].join(".") ;
        const jsonString = JSON.stringify({
            dataKey:dataKey,
            dType:dType,
            text: text,
            parents: parentsList,
            currentOption: option,
            values:values
        })
        props.setRequestQueries((currentVal) => {
            const currentObjects = {...currentVal};
            currentObjects[query] = jsonString
            return currentObjects;
        });
        console.log(`query=> ${query} | Selected => ${option}`)
    }
    
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
                options={settings.dataTypesAndOptions[dType]}
                onOptionSelect={onOptionSelect}
            ></OptionBlock>
            <DynamicValuesBlock
                queryPropsString={props.requestQueries[[...parentsList, dataKey].join(".")]}
                setRequestQueries={props.setRequestQueries}
                query={[...parentsList, dataKey].join(".")}
            >

            </DynamicValuesBlock>
        </Stack>
    );
}