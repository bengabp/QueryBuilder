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
    const {values, setValues, currentOptions, setCurrentOptions} = React.useContext(ValueContext)
    
    const options = settings.dataTypesAndOptions[dType].options;
    // const [currentOption, setCurrentOption] = React.useState(options[0]);

    React.useEffect(() => {
        // Update current values for queryline
        props.setQueryValues((current) => {
                    const prev = {...current};
                    prev[strKey] = values[strKey];
                    return prev;
                })
    },[values])

    React.useEffect(() => {
        props.setQueryCurrentOptions(prev => {
            let current = {...prev}
            current[strKey] = currentOptions[strKey]
            return current
        })
    }, [currentOptions])

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
                currentOptions={currentOptions}
                setCurrentOptions={setCurrentOptions}
                options={options}
                strKey={strKey}
            ></OptionBlock>
            {<DynamicValueBlock
                properties={properties}
                values={values}
                setValues={setValues}
                doCompletions={settings.dataTypesAndOptions[dType].supports_autocomplete === true}
                settings={settings}
                dType={dType}
                strKey={strKey}
                currentOption={currentOptions}
                queryCurrentOption={props.queryCurrentOption}
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
                    props.setQueryValues(prev => {
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
    if (props.dType === "date" && props.currentOption[props.strKey] !== "is_blank"){
        if (props.currentOption[props.strKey] === "between"){
            // Return <TwoDateValues>
            return (
                <TwoDateValues
                    setValues={props.setValues}
                    values={props.values}
                    strKey={props.strKey}
                    currentOption={props.currentOption}
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
                    currentOption={props.currentOption}
                >
                </SingleDateValue>
            );
        }
    } else if (props.dType === "number" && props.currentOption[props.strKey] !== "is_blank"){
        if (props.currentOption[props.strKey] === "between"){
            // Return <TwoNumberValues>
            return (
                <TwoNumberValues
                    setValues={props.setValues}
                    values={props.values}
                    strKey={props.strKey}
                    currentOption={props.currentOption}
                >
                </TwoNumberValues>
            );
        } else {
            // Return <SingleNumberValue>
            return (<SingleNumberValue
                    setValues={props.setValues}
                    values={props.values}
                    strKey={props.strKey}
                    currentOption={props.currentOption}
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
            queryCurrentOption={props.queryCurrentOption}
            queryValues={props.queryValues}
            optionsNoMultiSelect={props.optionsNoMultiSelect}
        />)
    }
}