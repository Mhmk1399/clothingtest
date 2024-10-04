"use client"

import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  userId: string;
  selectedColor: string;
  selectedSize: string;
  price: number;
  productTitle: string;
  paymentStatus: string;
  
}

interface User {
  _id: string;
  phoneNumber?: string;
  address?: string;
  zipCode?: string;
}

interface Color {
  _id: string;
  name: string;
}

interface Size {
  _id: string;
  name: string;
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  useEffect(() => {
    // Fetch orders data
    const fetchOrders = async () => {
      const response = await fetch('/api/order');
      const ordersData = await response.json();
      setOrders(ordersData);
    };

    // Fetch users data
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const usersData = await response.json();
      setUsers(usersData);
    };

    // Fetch colors data
    const fetchColors = async () => {
      const response = await fetch('/api/colors');
      const colorsData = await response.json();
      setColors(colorsData);
    };

    // Fetch sizes data
    const fetchSizes = async () => {
      const response = await fetch('/api/sizes');
      const sizesData = await response.json();
      setSizes(sizesData);
    };

    fetchOrders();
    fetchUsers();
    fetchColors();
    fetchSizes();
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await fetch(`/api/order/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentStatus: status }),
    });

    if (response.ok) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: status } : order
        )
      );
    }
  };

  const getUserDetails = (userId: string): User => {
    const user = users.find((user) => user._id === userId);
    return user || { _id: '', phoneNumber: '', address: '', zipCode: '' };
  };

  const getColorName = (colorId: string): string => {
    const color = colors.find((color) => color._id === colorId);
    return color ? color.name : 'Unknown';
  };

  const getSizeName = (sizeId: string): string => {
    const size = sizes.find((size) => size._id === sizeId);
    return size ? size.name : 'Unknown';
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Order ID</th>
              <th className="py-2 px-4 border-b border-gray-300">User ID</th>
              <th className="py-2 px-4 border-b border-gray-300">Phone Number</th>
              <th className="py-2 px-4 border-b border-gray-300">Color</th>
              <th className="py-2 px-4 border-b border-gray-300">Size</th>
              <th className="py-2 px-4 border-b border-gray-300">Address</th>
              <th className="py-2 px-4 border-b border-gray-300">Zip Code</th>
              <th className="py-2 px-4 border-b border-gray-300">Price</th>
              <th className="py-2 px-4 border-b border-gray-300">Product Title</th>
              <th className="py-2 px-4 border-b border-gray-300">Status</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const user = getUserDetails(order.userId);
              const colorName = getColorName(order.selectedColor);
              const sizeName = getSizeName(order.selectedSize);

              return (
                <tr key={order._id}>
                  <td className="py-2 px-4 border-b border-gray-300">{order._id}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{order.userId}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.phoneNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{colorName}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{sizeName}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.address}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.zipCode}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{order.price}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{order.productTitle}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{order.paymentStatus}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => updateOrderStatus(order._id, 'accepted')}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
