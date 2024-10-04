"use client";

import LaundryServicePage from '@/components/(ui)/LaundaryCard/LaundaryCard';
import OrdersTable from '@/components/(ui)/OrdersTable/OrdersTable';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('club');
  const [userData, setUserData] = useState<{ name: string; type: 'vip' | 'normal'; orders: number } | null>(null);
  const [coinBalance, setCoinBalance] = useState(0);
  const [showVipMessage, setShowVipMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/Login');
        return;
      }

      try {
        const decoded = jwtDecode<{ userName: string; userId: string; type: 'vip' | 'normal'; orders: number }>(token);

        setUserData({
          name: decoded.userName,
          type: decoded.type,
          orders: decoded.orders,
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        router.push('/Login');
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    if (userData) {
      const coinPerOrder = userData.type === 'vip' ? 200 : 100;
      setCoinBalance(userData.orders * coinPerOrder);
    }
  }, [userData]);

  const handleClubClick = () => {
    if (userData?.type !== 'vip') {
      setShowVipMessage(true);
    } else {
      setActiveSection('club');
    }
  };

  const renderContent = () => {
    if (!userData) {
      return null;
    }

    switch (activeSection) {
      case 'club':
        return userData.type === 'vip' ? (
          <div className="p-4 bg-white rounded-lg shadow-md" dir='rtl'>
            <h2 className="text-3xl font-semibold mb-4">لوسی من کلاب - VIP Services</h2>
            <LaundryServicePage />
          </div>
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-center mb-8">لوسی من کلاب</h2>
            <p className="text-center text-xl mb-4">
              این قسمت فقط برای مشتریان وی آیپی لوسی من می باشد. برای تبدیل شدن به مشتری ویژه مجموعه لوسی من از
              لینک زیر استفاده کنید.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4">
              ارتقا به VIP
            </button>
          </div>
        );
      case 'orders':
        return (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-center mb-8">سفارشات</h2>
            <OrdersTable />
          </div>
        );
      case 'courses':
        return (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-center mb-8">دوره های آموزشی</h2>
            <p className="text-center text-xl">به زودی تمام اعضای VIP می‌توانند به تمام ویدیوهای آموزشی دسترسی پیدا کنند.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen" dir='rtl'>
      <nav className="w-full md:w-64 bg-gray-800 text-white p-4 flex-shrink-0 md:h-screen">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/assets/images/14.jpg"
            alt="User Avatar"
            className="w-20 h-20 rounded-full mb-2"
            width={200}
            height={200}
          />
          <h3 className="text-xl mb-1">{userData?.name}</h3>
          <p className="mb-4">{userData?.type === 'vip' ? 'VIP Member' : 'Normal Member'}</p>
        </div>
        <ul className="space-y-4">
          <li>
            <button
              onClick={handleClubClick}
              className={`block w-full text-left py-2 px-4 rounded-md ${activeSection === 'club' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              لوسی من کلاب
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('orders')}
              className={`block w-full text-left py-2 px-4 rounded-md ${activeSection === 'orders' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              سفارشات
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('courses')}
              className={`block w-full text-left py-2 px-4 rounded-md ${activeSection === 'courses' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              دوره های آموزشی
            </button>
          </li>
        </ul>
      </nav>

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c.28 0 .53.11.71.29l.3.3c.18.18.29.43.29.71v1.41a1 1 0 01-.29.71l-.3.3c-.18.18-.43.29-.71.29H8a1 1 0 01-.71-.29l-.3-.3A1 1 0 017 11.41V10a1 1 0 01.29-.71l.3-.3c.18-.18.43-.29.71-.29H12z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.59 16.59A1 1 0 0120 17H4a1 1 0 01-.71-1.71l.3-.3a1 1 0 011.41 0l2.29 2.29A1 1 0 008 18h8a1 1 0 00.71-.29l2.29-2.29a1 1 0 011.41 0l.3.3c.18.18.29.43.29.71v1.41z"
              />
            </svg>
            <span className="ml-2 text-xl">{coinBalance} Coins</span>
          </div>
        </div>
        {renderContent()}
      </main>

      {/* VIP Message Modal */}
      {showVipMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">این سرویس فقط برای اعضای VIP است</h2>
            <p className="mb-4">برای استفاده از این سرویس، باید به عضویت VIP ارتقا دهید.</p>
            <button
              onClick={() => setShowVipMessage(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
