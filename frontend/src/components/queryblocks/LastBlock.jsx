import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OptionBlock from './OptionBlock';
import Stack from "@mui/material/Stack";
import AutoCompleteSearchField from './AutocompleteField';
import { SettingsContext } from '../../contexts/SettingsContext';

import SingleNumberValue from '../valueBlockTypes/numberTypes/SingleNumberValue';
import TwoNumberValues from '../valueBlockTypes/numberTypes/TwoNumberValues';
import SingleDateValue from '../valueBlockTypes/dateTypes/SingleDateValue';
import TwoDateValues from '../valueBlockTypes/dateTypes/TwoDateValues';


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

    // console.log("Request Queries => ",props.requestQueries);

    const [values, setValues] = React.useState([]);
    const options = settings.dataTypesAndOptions[dType].options;
    const [currentOption, setCurrentOption] = React.useState(options[0]);
    /* 
        requestQueries={props.requestQueries}
        etRequestQueries={props.setRequestQueries}

    */
    React.useEffect(() => {
        const query = [...parentsList, dataKey].join(".") ;
        const jsonString = JSON.stringify({
            dataKey:dataKey,
            dType:dType,
            text: text,
            parents: parentsList,
            currentOption: currentOption,
            values:values
        })
        props.setRequestQueries((currentVal) => {
            const currentObjects = {...currentVal};
            currentObjects[query] = jsonString
            return currentObjects;
        });

        console.log("Supports completion => ", settings.dataTypesAndOptions[dType].supports_autocomplete == true);
    }, [currentOption, values])


    
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
                currentOption={currentOption}
                setCurrentOption={setCurrentOption}
                options={options}
            ></OptionBlock>
            <DynamicValueBlock
                queryProperties={JSON.parse(props.requestQueries[[...parentsList, dataKey].join(".")])}
                values={values}
                setValues={setValues}
                doCompletions={settings.dataTypesAndOptions[dType].supports_autocomplete !== true ? false : true}
                settings={settings}
                dType={dType}
                currentOption={currentOption}
            />
        </Stack>
    );
}


function DynamicValueBlock(props){
    if (props.dType === "date" && props.currentOption !== "is_blank"){
        if (props.currentOption === "between"){
            // Return <TwoDateValues>
            return (
                <TwoDateValues
                    setValues={props.setValues}
                    values={props.values}
                >
                </TwoDateValues>
            );
        } else {
            // Return <SingleDateValue>
            return (
                <SingleDateValue
                    setValues={props.setValues}
                    values={props.values}
                >
                </SingleDateValue>
            );
        }
    } else if (props.dType === "number" && props.currentOption !== "is_blank"){
        if (props.currentOption === "between"){
            // Return <TwoNumberValues>
            return (
                <TwoNumberValues
                    setValues={props.setValues}
                    values={props.values}
                >
                </TwoNumberValues>
            );
        } else {
            // Return <SingleNumberValue>
            return (
                <SingleNumberValue
                    setValues={props.setValues}
                    values={props.values}
                >
                </SingleNumberValue>
            );
        }

    } else {
        // let multiSelect = true;
        // let doCompletions = props.doCompletions;
        // let options = ["true", "false"]

        // if (props.currentOption === "is_blank"){
        //     multiSelect = false
        // }
        // if (props.dType === "boolean"){
        //     multiSelect = false
        // }
        return (<AutoCompleteSearchField
            queryProperties={props.queryProperties}
            setValues={props.setValues}
            dType={props.dType}
            // doCompletions={doCompletions}
            // doMultiSelect={multiSelect}
            values={props.values}
            currentOption={props.currentOption}
        />)
    }
}