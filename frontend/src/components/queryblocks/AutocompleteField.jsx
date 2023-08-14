import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export const api_uri = "http://20.77.89.95:8080"

export default function AutoCompleteSearchField(props) {
  const [suggestions, setSuggestions] = React.useState([]);
  
  const getSuggestions = async (inputValue) => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const query = [...props.queryProperties.parents, props.queryProperties.dataKey].join(".") ;

      const response = await fetch(`${api_uri}/completions?q=${inputValue}&field_path=${query}`);
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
        multiple={true}
        id="values-autocomplete"
        options={suggestions}
        autoComplete={props.doCompletions}
        freeSolo={!props.doCompletions}
        getOptionDisabled={(option) => props.queryProperties.values.includes(option)}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option.toLowerCase() == value.toLowerCase()}
        onFocus={props.doCompletions ? () => {
          getSuggestions("")
        } : null}
        fullWidth={false}
        onInputChange={(event, newInputValue) => {
          getSuggestions(newInputValue);
        }}
        onChange={(event, selectedSugs, reason) => {
          // Update values and queryPropsString
          if (selectedSugs === null){
            selectedSugs = [];
          } else if (typeof selectedSugs === "string"){
            selectedSugs = [selectedSugs]
          } else if (typeof selectedSugs === "object"){
            selectedSugs = [...selectedSugs]
          }
          console.log(selectedSugs)
          props.setValues(selectedSugs);
          const jsonString = JSON.stringify({
              dataKey:props.queryProperties.dataKey,
              dType:props.queryProperties.dType,
              text: props.queryProperties.text,
              parents: props.queryProperties.parents,
              currentOption: props.queryProperties.option,
              values:selectedSugs
          })
          const query = [...props.queryProperties.parents, props.queryProperties.dataKey].join(".") ;
          props.setRequestQueries((currentVal) => {
            const currentObjects = {...currentVal};
            currentObjects[query] = jsonString
            return currentObjects;
          })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Value"
          />
        )}
        sx={{
            height:'10px',
            width:'max-content',
            minWidth:'300px',
            borderBottomColor:'#808080a1',
            paddingLeft:'10px',
            
        }}
      />
    </Stack>
  );
}
