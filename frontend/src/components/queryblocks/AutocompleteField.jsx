import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';
export const api_uri = "http://127.0.0.1:8000"

export default function AutoCompleteSearchField(props) {
  const [suggestions, setSuggestions] = React.useState([]);
  const isMulti = !(props.optionsNoMultiSelect.includes(props.currentOption) || props.dType === "boolean");
  const getSuggestions = async (inputValue) => {
    if (props.optionsNoMultiSelect.includes(props.currentOption)){
      setSuggestions(["true","false"])
      return
    }
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await fetch(`${api_uri}/completions?q=${inputValue}&field_path=${props.strKey}`);
      const data = await response.json();
      const suggestionsSet = new Set(data.completions);
      setSuggestions([...suggestionsSet]);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  return (
    <Stack spacing={3} 
      id="valuesAutoCompleteContainer"
      direction="row"
      className={"elevatedValueBlock"}
    >
      <Autocomplete
        key={props.strKey}
        multiple={isMulti}
        id="values-autocomplete"
        options={suggestions}
        autoComplete={true}
        freeSolo
        // defaultValue={[]}
        value={(isMulti === true && props.values !== undefined) && props.values[props.strKey]}
        getOptionDisabled={(option) => props.values !== undefined && props.values[props.strKey]?.includes(option)}
        getOptionLabel={(option) => {return typeof option === "string" && option.length > 0 ? option : ""}}
        isOptionEqualToValue={(option, value) => typeof option === 'string' && typeof value === 'string' ? option.toLowerCase() === value.toLowerCase() : false}
        onFocus={() => {
          getSuggestions("")
        }}
        fullWidth={false}
        // onInputChange={(event, newInputValue) => {
        //   getSuggestions(newInputValue);
        // }}
        // value={suggestions}
        onChange={(event, selectedSugs, reason) => {
          // Update values and queryPropsString
          if (selectedSugs == null){
            selectedSugs = [];
          } else if (typeof selectedSugs === "string"){
            selectedSugs = [selectedSugs]
          } else if (typeof selectedSugs === "object"){
            selectedSugs = [...selectedSugs]
          }
          
          props.setValues(prev => {
            const current = {...prev}
            current[props.strKey] = selectedSugs
            return current
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Value"
          />
        )}
        renderTags={(value, getTagProps) => (
          value.map((option, index) => (
            <Chip
              variant='filled'
              key={index}
              label={option}
              {...getTagProps(index)}
            />
          ))
        )}
        sx={{
            height:'10px',
            width:'max-content',
            minWidth:'300px',
            borderBottomColor:'#808080a1',
            paddingLeft:'10px'
        }}
      />
    </Stack>
  );
}
