import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './Routes/App.jsx'
import Admin from './Routes/Admin.jsx';
import ProductPage from './Routes/ProductPage.jsx';
import Cart from './Routes/Cart.jsx';
import Login from './Routes/Login.jsx';
import Register from './Routes/Register.jsx';
import EmployeeOrdersPage from './Routes/EmployeeOrdersPage.jsx';
import OrderPage from './Routes/OrderPage.jsx';
import NotFound from './Routes/404.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route index element={<App />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart/" element={<Cart />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
      <Route path="/employee/orders" element={<EmployeeOrdersPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
    </Routes>
  </BrowserRouter>
)
