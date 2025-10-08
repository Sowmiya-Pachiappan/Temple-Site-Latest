import { DataGrid } from '@mui/x-data-grid';
import { Stack, IconButton } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';

const UserTable = ({ rows, loading, onView }) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'title', headerName: 'Title', flex: 0.7 },
    { field: 'name', headerName: 'Name', flex: 1.5 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'fatherName',
      headerName: 'Father Name',
      flex: 1.5,
    },
    {
      field: 'motherName',
      headerName: 'Mother Name',
      flex: 1.5,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      flex: 1.5,
      renderCell: (params) =>
        `${params?.row?.mobileCode || ''} ${
          params?.row?.mobileNumber || ''
        }`.trim(),
    },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'memberReference',
      headerName: 'Member Reference (User ID)',
      flex: 1.5,
      renderCell: (params) => params?.row?.Referrer?.name,
    },
    {
      field: 'familyDevataMandir',
      headerName: 'Family Devata Mandir',
      flex: 1.5,
      renderCell: (params) =>
        params?.row?.familyDevata?.mandirName,
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

export default UserTable;
