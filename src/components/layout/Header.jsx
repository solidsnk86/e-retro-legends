import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Button from "../common/Button";

const Header = ({ isAuthenticated, userRole, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-100 text-gray-700 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
            <Link to="/about" className="hover:underline">
              Acerca de
            </Link>
            <Link to="/contact" className="hover:underline">
              Contacto
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <span className="font-medium">👋 Hola, Usuario</span>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className="hover:text-blue-600 font-medium"
                  >
                    Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link to="/buyer/orders" className="hover:text-blue-600">
                    Mis Compras
                  </Link>
                )}
                <button onClick={onLogout} className="hover:text-blue-600">
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600">
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
            e-<span className="text-yellow-500">Retro</span>{" "}
            <span className="text-gray-800">Legends</span>
          </h1>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 w-full sm:w-auto flex gap-2 max-w-2xl"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artículos, equipos o colecciones..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          <Button type="submit" variant="primary" className="px-4 py-2">
            Buscar
          </Button>
        </form>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition"
        >
          <span className="text-2xl">🛒</span>
          <div className="text-left">
            <p className="text-xs text-gray-500">Carrito</p>
            <p className="text-sm font-semibold">{getCartItemsCount()} ítems</p>
          </div>
        </Link>
      </div>

      {/* Categories bar */}
      <nav className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-6 text-sm font-medium text-gray-700">
          <Link
            to="/category/futbol"
            className="hover:text-blue-600 transition-colors"
          >
            ⚽ Fútbol
          </Link>
          <Link
            to="/category/basketball"
            className="hover:text-blue-600 transition-colors"
          >
            🏀 Basketball
          </Link>
          <Link
            to="/category/tenis"
            className="hover:text-blue-600 transition-colors"
          >
            🎾 Tenis
          </Link>
          <Link
            to="/category/baseball"
            className="hover:text-blue-600 transition-colors"
          >
            ⚾ Baseball
          </Link>
          <Link
            to="/category/otros"
            className="hover:text-blue-600 transition-colors"
          >
            🏆 Otros Deportes
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
