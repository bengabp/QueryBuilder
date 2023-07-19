import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const QueryBuilder = () => {
  const [queries, setQueries] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [value, setValue] = useState('');

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleAddQuery = () => {
    const query = {
      field: selectedField,
      operator: selectedOperator,
      value: value,
    };
    setQueries([...queries, query]);
    setSelectedField('');
    setSelectedOperator('');
    setValue('');
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Field</InputLabel>
        <Select value={selectedField} onChange={handleFieldChange}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="location">Location</MenuItem>
          <MenuItem value="funding">Funding</MenuItem>
          {/* Add more fields */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Operator</InputLabel>
        <Select value={selectedOperator} onChange={handleOperatorChange}>
          <MenuItem value="equals">Equals</MenuItem>
          <MenuItem value="contains">Contains</MenuItem>
          <MenuItem value="greaterThan">Greater Than</MenuItem>
          {/* Add more operators */}
        </Select>
      </FormControl>
      <TextField
        label="Value"
        value={value}
        onChange={handleValueChange}
        style={{ marginLeft: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddQuery}>
        Add Query
      </Button>
      <div>
        {queries.map((query, index) => (
          <div key={index}>
            <Typography>
              Field: {query.field}, Operator: {query.operator}, Value: {query.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryBuilder;
