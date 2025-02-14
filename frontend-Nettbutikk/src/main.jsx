import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './Routes/App.jsx'
import Admin from './Routes/Admin.jsx';
import ProductPage from './Routes/ProductPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/products/:id" element={<ProductPage />} />
    </Routes>
  </BrowserRouter>
)
