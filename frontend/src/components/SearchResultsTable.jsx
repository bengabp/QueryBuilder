import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { SettingsContext } from '../contexts/SettingsContext';
import { Avatar } from '@mui/material';


const columns = [
  {
    field: 'name',
    headerName: 'Company Name',
    width: 150,
    renderCell: (params) => {
      const { row } = params;
      return (
        <div style={{ display: 'flex', alignItems: 'center', padding: "5px" }}>
          <Avatar 
            alt={row.name} 
            src={row.thumbnailUrl} 
            style={{
              height: "32px",
              width: "32px"
            }}
          />
          <span style={{ marginLeft: 8 }}>{row.name}</span>
        </div>
      );
    },
  },
  {
    field: "employeesRange",
    headerName: "Employees",
    width: 100,
    editable: false
  },
  {
    field: "companyStatus",
    headerName: "Status",
    width: 100,
    editable: false
  },
  {
    field: "launchYear",
    headerName: "Launch Year",
    width: 100,
    editable: false
  },
  {
    field: "totalPatents",
    headerName: "Patents",
    width: 100,
    editable: false
  },
  {
    field: "type",
    headerName: "type",
    width: 80,
    editable: false
  },
  {
    field: "totalJobs",
    headerName: "Jobs",
    width: 70,
    editable: false
  },
  {
    field: "tagline",
    headerName: "Tag Line",
    width: 400,
    editable: false
  },
  {
    field: "address",
    headerName: "Headquarters",
    width: 500,
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
              // pageSize: 5,
            },
          },
        }}
        // pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
  );
}
