import { DataGrid } from '@mui/x-data-grid';
import { Stack, IconButton } from '@mui/material';
import { AddTask, RemoveRedEye } from '@mui/icons-material';

const TempleTable = ({
  rows,
  loading,
  onVerify,
  onView,
}) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'mandirName',
      headerName: 'Mandir Name',
      flex: 2,
    },
    {
      field: 'dietyName',
      headerName: 'Diety Name',
      flex: 1,
    },
    { field: 'state', headerName: 'State', flex: 1 },
    {
      field: 'district',
      headerName: 'District',
      flex: 1,
    },
    {
      field: 'isVerified',
      headerName: 'Verified',
      flex: 1,
      type: 'boolean',
      renderCell: (params) =>
        params.row.isVerified ? 'Verified' : 'Not Verified',
    },
    {
      field: 'managedBy',
      headerName: 'Managed By',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      renderCell: (params) => {
        const { phoneCode, phoneNumber } = params.row;
        return `${phoneCode || ''} ${
          phoneNumber || ''
        }`.trim();
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction={'row'}>
          {!params.row.isVerified && (
            <IconButton
              className='text-yellow-500'
              onClick={() => onVerify(params.row.id)}
            >
              <AddTask />
            </IconButton>
          )}
          <IconButton
            className='text-blue-500'
            onClick={() => onView(params.row.id)}
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

export default TempleTable;
