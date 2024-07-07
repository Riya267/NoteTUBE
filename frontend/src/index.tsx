import { createRoot } from 'react-dom/client';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Dashboard from './app/dashboard';
import Header from './components/ui/header';
import Footer from './components/ui/Footer';
import './index.css';
import { ContextProvider } from './context/appContext';
import Generate from './app/generate';
import NotFound from './app/notFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/generate',
    element: <Generate />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </ContextProvider>
);
