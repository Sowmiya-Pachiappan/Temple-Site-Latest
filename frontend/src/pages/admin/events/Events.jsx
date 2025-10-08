import { getEvents } from '@/api/eventsApi';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EventSnackbars from './EventSnackbar';
import EventTable from './EventTable';
import EventDrawer from './EventDrawer';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);
  const [showErrorAlert, setShowErrorAlert] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setEvents(res.data.events);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;
      setError(message);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };
  const viewHandler = (id) => {
    const event = events.find((t) => t.id === id);
    console.log(event);
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const closeHandler = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const rows = events.map((event) => ({
    id: event.id,
    ...event,
  }));

  return (
    <Box className='flex flex-col gap-10'>
      <Typography
        variant='h4'
        className='font-bold text-2xl'
      >
        Manage Events
      </Typography>
      <EventSnackbars
        showSuccess={showSuccessAlert}
        showError={showErrorAlert}
        error={error}
        onClose={closeHandler}
      />
      <EventTable
        rows={rows}
        loading={loading}
        onView={viewHandler}
      />
      <EventDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        event={selectedEvent}
      />
    </Box>
  );
};

export default Events;
