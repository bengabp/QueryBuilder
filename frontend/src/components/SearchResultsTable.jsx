import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { SettingsContext } from '../contexts/SettingsContext';


const columns = [
  {
    field: 'name',
    headerName: 'Company Name',
    width: 250,
    editable: true
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    editable: true
  }
];


export default function SearchResultsTable() {
  const settings = React.useContext(SettingsContext);
  return (
      <DataGrid
        rows={settings.companies.results}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
  );
}
