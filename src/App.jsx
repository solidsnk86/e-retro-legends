import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Páginas públicas
import Home from './pages/Public/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Páginas comprador
import Cart from './pages/Buyer/Cart';
import Checkout from './pages/Buyer/Checkout';
import OrderConfirmation from './pages/Buyer/OrderConfirmation';
import OrderHistory from './pages/Buyer/OrderHistory';

// Páginas vendedor
import SellerDashboard from './pages/Seller/SellerDashboard';
import ProductManagement from './pages/Seller/ProductManagement';
import ProductForm from './pages/Seller/ProductForm';

import './App.css';

// Componente de rutas protegidas
const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Componente Layout
const Layout = ({ children }) => {
  const { isAuthenticated, userRole, logout } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        onLogout={logout}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Rutas Comprador */}
              <Route path="/cart" element={<Cart />} />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/order-confirmation" 
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/buyer/orders" 
                element={
                  <ProtectedRoute allowedRole="buyer">
                    <OrderHistory />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rutas vendedor */}
              <Route 
                path="/seller/dashboard" 
                element={
                  <ProtectedRoute allowedRole="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/products" 
                element={
                  <ProtectedRoute allowedRole="seller">
                    <ProductManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/products/new" 
                element={
                  <ProtectedRoute allowedRole="seller">
                    <ProductForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/seller/products/edit/:id" 
                element={
                  <ProtectedRoute allowedRole="seller">
                    <ProductForm />
                  </ProtectedRoute>
                } 
              />
              
              {/* Cachear todos - redirección al inicio */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

