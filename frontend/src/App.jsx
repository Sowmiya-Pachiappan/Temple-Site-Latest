import { ThemeProvider } from '@emotion/react';
import '@/styles/App.css';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/montserrat';
import { Route, Routes } from 'react-router';

import AppLayout from './layouts/AppLayout';
import Home from './pages/home/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AuthLayout from './layouts/AuthLayout';

import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './layouts/AdminLayout';

import PrivateLayout from './layouts/PrivateLayout';

import RedirectLogic from './pages/RedirectLogic';
import AdminRoute from './routes/AdminRoute';
import PrivateRoute from './routes/PrivateRoute';

import Temples from './pages/admin/temple/Temples';
import Events from './pages/admin/events/Events';
import Users from './pages/admin/user/Users';
import HomePageContent from './pages/admin/homePageContent/HomePageContent';
import AddTemple from './pages/temple/AddTemple';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#F97F54',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<RedirectLogic />} />

        <Route element={<AppLayout />}>
          <Route path='home' element={<Home />} />
          <Route
            path='temple/new'
            element={<AddTemple />}
          ></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path='admin' element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route
              path='dashboard'
              element={<Dashboard />}
            />
            <Route
              path={'temples'}
              element={<Temples />}
            ></Route>
            <Route
              path={'users'}
              element={<Users />}
            ></Route>
            <Route
              path={'events'}
              element={<Events />}
            ></Route>
            <Route
              path={'homePageContent'}
              element={<HomePageContent />}
            ></Route>
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path='dashboard'
            element={<PrivateLayout />}
          >
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
