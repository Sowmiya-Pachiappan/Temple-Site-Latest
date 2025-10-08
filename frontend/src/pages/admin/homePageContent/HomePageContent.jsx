import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Button,
  Stack,
} from '@mui/material';
import ReactQuill from 'react-quill-new';
import { updateHomePageContent } from '@/api/homePageApi';
import 'react-quill-new/dist/quill.snow.css';
import { getHomePageContent } from '../../../api/homePageApi';

const HomePageContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await getHomePageContent();
        const { title, content, imageUrl } = res.data || {};
        console.log(imageUrl);
        setFormData({ title, content, image: null });
        setPreview(`/uploads/${imageUrl}`);
      } catch (err) {
        console.error(
          'Error fetching homepage:',
          err.message
        );
        setSnackbar({
          open: true,
          message:
            err.message ||
            'Failed to load homepage content.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHomePage();
  }, []);

  const handleQuillChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    console.log(e);
    const { name, files } = e.target;

    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.image)
      data.append('image', formData.image);

    try {
      await updateHomePageContent(data);
      setSnackbar({
        open: true,
        message: 'Homepage updated successfully',
        severity: 'success',
      });
    } catch (err) {
      console.error('Update error:', err);
      setSnackbar({
        open: true,
        message: err.message || 'Failed to update homepage',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      maxWidth={700}
      className='flex flex-col gap-2'
    >
      <Typography
        variant='h4'
        className='font-bold text-2xl'
      >
        Edit Homepage Content
      </Typography>

      <Typography variant='subtitle1'>Title</Typography>
      <ReactQuill
        value={formData.title}
        onChange={(value) =>
          handleQuillChange(value, 'title')
        }
        theme='snow'
        className='rounded-sm'
      />

      <Typography variant='subtitle1'>Content</Typography>
      <ReactQuill
        value={formData.content}
        onChange={(value) =>
          handleQuillChange(value, 'content')
        }
        theme='snow'
        className='h-56 rounded-sm'
      />
      <Stack className='mt-16'>
        <Typography variant='subtitle1'>
          Choose an Image
        </Typography>
        <Button
          component='label'
          className='border border-[#ccc] text-current'
        >
          Upload File
          <input
            type='file'
            name='image'
            hidden
            accept='image/*'
            onChange={handleChange}
          />
        </Button>{' '}
        {formData.image && (
          <Typography
            variant='body2'
            className='mt-2 text-gray-600'
          >
            Selected File: {formData.image.name} (
            {(formData.image.size / 1024).toFixed(1)} KB,{' '}
            {formData.image.type})
          </Typography>
        )}
        {preview && (
          <>
            <img
              src={preview}
              alt='Preview'
              className='mt-4 rounded max-h-64 object-contain'
            />
          </>
        )}
      </Stack>
      <Button
        type='submit'
        className='bg-brand-500 hover:bg-brand-600 mt-12 text-white'
      >
        Save Changes
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          className='w-full'
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePageContent;
