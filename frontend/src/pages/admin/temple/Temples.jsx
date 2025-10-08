import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTemples, verifyTemple } from '@/api/templeApi';
import FullPageLoader from '@/components/FullPageLoader';
import TempleDrawer from './TempleDrawer';
import TempleSnackbars from './TempleSnackbars';
import TempleTable from './TempleTable';

const Temples = () => {
  const [temples, setTemples] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);
  const [showErrorAlert, setShowErrorAlert] =
    useState(false);
  const [selectedTemple, setSelectedTemple] =
    useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const res = await getTemples();
      setTemples(res.data.temples);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;
      setError(message);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyHandler = async (id) => {
    setError('');
    setShowErrorAlert(false);
    setVerifyLoading(true);
    try {
      const res = await verifyTemple(id);
      if (res) {
        setShowSuccessAlert(true);
        await fetchTemples();
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;
      setError(message);
      setShowErrorAlert(true);
    } finally {
      setVerifyLoading(false);
    }
  };

  const viewHandler = (id) => {
    const temple = temples.find((t) => t.id === id);
    setSelectedTemple(temple);
    setDrawerOpen(true);
  };

  const closeHandler = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  const rows = temples.map((temple) => ({
    id: temple.id,
    ...temple,
  }));

  return (
    <Box className='flex flex-col gap-10'>
      {verifyLoading && <FullPageLoader />}
      <Typography
        variant='h4'
        className='font-bold text-2xl'
      >
        Manage Temples
      </Typography>
      <TempleSnackbars
        showSuccess={showSuccessAlert}
        showError={showErrorAlert}
        error={error}
        onClose={closeHandler}
      />
      <TempleTable
        rows={rows}
        loading={loading}
        onVerify={verifyHandler}
        onView={viewHandler}
      />
      <TempleDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        temple={selectedTemple}
      />
    </Box>
  );
};

export default Temples;
