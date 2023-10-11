import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OptionBlock from './OptionBlock';
import Stack from "@mui/material/Stack";
import AutoCompleteSearchField from './AutocompleteField';
import { SettingsContext } from '../../contexts/SettingsContext';
import CloseIcon from '@mui/icons-material/Close';
import SingleNumberValue from '../valueBlockTypes/numberTypes/SingleNumberValue';
import TwoNumberValues from '../valueBlockTypes/numberTypes/TwoNumberValues';
import SingleDateValue from '../valueBlockTypes/dateTypes/SingleDateValue';
import TwoDateValues from '../valueBlockTypes/dateTypes/TwoDateValues';
import IconButton from '@mui/material/IconButton';
import { ValueContext } from '../../contexts/ValueContext';



export default function LastBlock(props) {
    let className = `blockWithConnectors ${props.blockClassName}`;
    const settings = React.useContext(SettingsContext);
    if (props.index === 0){
        className += ` noUpLine`
    }
    const optionsNoMultiSelect = ["is_blank", "equals", "does_not_equal"];
    const properties = JSON.parse(props.properties);
    const text = properties.text;
    const dataKey = properties.dataKey;
    const parentsList = properties.parents
    const dType = properties.dType
    const strKey = [...parentsList, dataKey].join(".")
    const {values, setValues} = React.useContext(ValueContext)

    console.log("values", values)
    
    const options = settings.dataTypesAndOptions[dType].options;
    const [currentOption, setCurrentOption] = React.useState(options[0]);

    React.useEffect(() => {
        // Update current values for queryline
        props.setQueryValues(values)
    },[values])

    React.useEffect(() => {
        props.setQueryCurrentOptions(prev => {
            let current = {...prev}
            current[strKey] = currentOption
            return current
        })
    }, [currentOption])

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
            {<DynamicValueBlock
                properties={properties}
                values={values}
                setValues={setValues}
                doCompletions={settings.dataTypesAndOptions[dType].supports_autocomplete === true}
                settings={settings}
                dType={dType}
                strKey={strKey}
                currentOption={currentOption}
                optionsNoMultiSelect={optionsNoMultiSelect}
            />}
            <IconButton
                className="removeFilterButton"
                size='20px'
                onClick={(event) => {
                    props.onFilterRemove(strKey)
                    setValues(prev => {
                        let current = {...prev}
                        delete current[strKey]
                        return current
                    })
                    props.setQueryCurrentOptions(prev => {
                        let current = {...prev}
                        delete current[strKey]
                        return current
                    })
                }}
            >
                <CloseIcon
                    sx={{color: "grey"}}
                    aria-label="remove filter"
                ></CloseIcon>
            </IconButton>
        </Stack>
    );
}


function DynamicValueBlock(props) {
    if (props.dType === "date" && props.currentOption !== "is_blank"){
        if (props.currentOption === "between"){
            // Return <TwoDateValues>
            return (
                <TwoDateValues
                    setValues={props.setValues}
                    values={props.values}
                    strKey={props.strKey}
                >
                </TwoDateValues>
            );
        } else {
            // Return <SingleDateValue>
            return (
                <SingleDateValue
                    setValues={props.setValues}
                    values={props.values}
                    strKey={props.strKey}
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
                    strKey={props.strKey}
                >
                </TwoNumberValues>
            );
        } else {
            // Return <SingleNumberValue>
            return (<SingleNumberValue
                    setValues={props.setValues}
                    values={props.values}
                    strKey={props.strKey}
                >
                </SingleNumberValue>
            );
        }

    } else {

        return (<AutoCompleteSearchField
            properties={props.properties}
            strKey={props.strKey}
            setValues={props.setValues}
            dType={props.dType}
            values={props.values}
            currentOption={props.currentOption}
            queryValues={props.queryValues}
            optionsNoMultiSelect={props.optionsNoMultiSelect}
        />)
    }
}