import { DataGrid } from '@mui/x-data-grid';
import { Stack, IconButton } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';

const EventTable = ({ rows, loading, onView }) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'mandirName',
      headerName: 'Temple',
      flex: 1,
      renderCell: (params) =>
        params?.row?.Temple?.mandirName,
    },
    {
      field: 'eventDate',
      headerName: 'Event Date',
      flex: 1,

      renderCell: (params) =>
        new Date(params?.row?.eventDate).toLocaleDateString(
          'en-GB'
        ),
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 2,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      flex: 1,
      renderCell: (params) => params?.row?.User?.name,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction={'row'}>
          <IconButton
            className='text-blue-500'
            onClick={() => onView(params?.row?.id)}
          >
            <RemoveRedEye />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <DataGrid
      loading={loading}
      rows={rows}
      columns={columns}
      pageSize={10}
      disableRowSelectionOnClick
    />
  );
};

export default EventTable;
