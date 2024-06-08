import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './app/dashboard';
import Header from './components/header';
import Footer from './components/footer';
import './index.css';

/* eslint-disable */
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </StrictMode>
);
