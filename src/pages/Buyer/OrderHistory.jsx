import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const OrderHistory = () => {
  // Datos de ejemplo - en producción vendrían del backend
  const orders = [
    {
      id: 1,
      orderNumber: '789456',
      date: '2025-10-15',
      status: 'Entregado',
      total: 249.99,
      items: [
        { name: 'Camiseta Retro Brasil 1970', quantity: 1, price: 89.99 },
        { name: 'Jersey Chicago Bulls 1996', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 2,
      orderNumber: '654321',
      date: '2025-10-10',
      status: 'En Tránsito',
      total: 199.99,
      items: [
        { name: 'Raqueta Wilson Pro Staff 85', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: 3,
      orderNumber: '456789',
      date: '2025-10-05',
      status: 'Procesando',
      total: 119.99,
      items: [
        { name: 'Camiseta Argentina 1986', quantity: 1, price: 119.99 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'En Tránsito':
        return 'bg-blue-100 border-blue-400 text-blue-800';
      case 'Procesando':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 border-red-400 text-red-800';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Entregado':
        return '✅';
      case 'En Tránsito':
        return '🚚';
      case 'Procesando':
        return '⏳';
      case 'Cancelado':
        return '❌';
      default:
        return '📦';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-2 border-gray-400 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No tienes pedidos aún
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Explora nuestros productos y realiza tu primera compra!
            </p>
            <Link to="/">
              <Button variant="primary" size="large">
                Ir a la tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Mis Pedidos</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border-2 border-gray-400">
              {/* Order Header */}
              <div className="bg-gray-100 border-b-2 border-gray-400 p-4">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-600">Pedido</p>
                      <p className="font-bold">#{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fecha</p>
                      <p className="font-bold">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="font-bold text-green-700">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 border-2 font-bold text-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
                        <span className="text-2xl">📦</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-700">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="border-t-2 border-gray-400 p-4 bg-gray-50">
                <div className="flex gap-3">
                  <Button variant="primary" size="small">
                    Ver Detalles
                  </Button>
                  {order.status === 'Entregado' && (
                    <Button variant="outline" size="small">
                      Comprar de Nuevo
                    </Button>
                  )}
                  {order.status === 'En Tránsito' && (
                    <Button variant="outline" size="small">
                      Rastrear Envío
                    </Button>
                  )}
                  {order.status === 'Procesando' && (
                    <Button variant="danger" size="small">
                      Cancelar Pedido
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

