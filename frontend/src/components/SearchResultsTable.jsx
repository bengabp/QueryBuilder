import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { SettingsContext } from '../contexts/SettingsContext';
import { Avatar } from '@mui/material';


export default function SearchResultsTable(props) {
  const settings = React.useContext(SettingsContext);
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
      width: 80,
      editable: false
    },
    {
      field: "totalPatents",
      headerName: "Patents",
      width: 80,
      editable: false
    },
    {
      field: "type",
      headerName: "Type",
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

  return (
      <DataGrid
        rows={props.companies == undefined ? []: props.companies}
        columnHeaderHeight={45}
        columns={columns}
        hideFooter={true}
        pageSizeOptions={[]}
        checkboxSelection
        disableRowSelectionOnClick
        scrollbarSize={3}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          props.setSelectedRows([...selectedIDs]);
        }}
      />
  );
}
