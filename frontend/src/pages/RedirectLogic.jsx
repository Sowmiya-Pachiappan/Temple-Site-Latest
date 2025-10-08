import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RedirectLogic = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } else {
      navigate('/home');
    }
  }, [navigate]);

  return null;
};

export default RedirectLogic;
