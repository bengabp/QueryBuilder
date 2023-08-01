import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MyAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint to fetch suggestions
      const response = await fetch(`your-api-endpoint?query=${inputValue}`);
      const data = await response.json();
      setSuggestions(data); // Assuming data is an array of suggestion options
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <Autocomplete
      multiple
      id="values-autocomplete"
      options={suggestions} // Use the fetched suggestions as options
      autoComplete={true}
      defaultValue={[]} // Set an empty array as the default value for multiple Autocomplete
      fullWidth={false}
      renderInput={(params) => (
        <TextField {...params} variant="standard" placeholder="Value" />
      )}
      onInputChange={(event, newInputValue) => {
        // Call the fetchSuggestions function with the user's input
        fetchSuggestions(newInputValue);
      }}
      sx={{
        height: '10px',
        width: 'max-content',
        borderBottomColor: 'grey',
      }}
    />
  );
};

export default MyAutocomplete;
