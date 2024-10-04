"use client"
import { useState, useEffect } from 'react';
import ColorUploadForm from '@/components/(forms)/colors/ColorUploadForm';
import FileUploadForm from '../../components/(forms)/story/FileUploadForm';
import CategoriesFormUpload from '@/components/(forms)/Categories/CategoriesFormUpload';
import SizesUploadForm from '@/components/(forms)/Sizes/SizesUploadForm';
import ProductsUploadForm from '@/components/(forms)/products/ProductsUploadForm';
import OrdersTable from '@/components/(forms)/OrdersTable/[id]/OrdersTable';
// import OrdersTable from '@/components/(forms)/orders/OrdersTable'; // Import a new Orders component

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState('files');
  const [sizesData, setSizesData] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [laundryServicesData, setLaundryServicesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  // Fetch the existing data for each component
  useEffect(() => {
    // Fetch the sizes data
    const fetchSizesData = async () => {
      const response = await fetch('/api/sizes'); // Adjust the API endpoint as per your backend
      const data = await response.json();
      setSizesData(data);
    };

    // Fetch the colors data
    const fetchColorsData = async () => {
      const response = await fetch('/api/colors');
      const data = await response.json();
      setColorsData(data);
    };

    // Fetch the categories data
    const fetchCategoriesData = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategoriesData(data);
    };

    // Fetch the products data
    const fetchProductsData = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProductsData(data);
    };

    // Fetch the laundry services data
    const fetchLaundryServicesData = async () => {
      const response = await fetch('/api/laundryservice');
      const data = await response.json();
      setLaundryServicesData(data);
    };

    const fetchOrdersData = async () => {
      const response = await fetch('/api/order');
      const data = await response.json();
      setOrdersData(data);
    };

    fetchSizesData();
    fetchColorsData();
    fetchCategoriesData();
    fetchProductsData();
    fetchLaundryServicesData();
    fetchOrdersData();
  }, []);

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'files':
        return <FileUploadForm />;
      case 'colors':
        return (
          <>
            <ColorUploadForm />
            <TableComponent data={colorsData} columns={['Color id','color name', 'Hex Value','date']} />
          </>
        );
      case 'categories':
        return (
          <>
            <CategoriesFormUpload />
            <TableComponent data={categoriesData} columns={['Category id', 'Category Name', 'date']} />
          </>
        );
      case 'sizes':
        return (
          <>
            <SizesUploadForm />
            <TableComponent data={sizesData} columns={['Size ID', 'Size name','1','2','3','4','5','6','7']} />
          </>
        );
      case 'products':
        return (
          <>
            <ProductsUploadForm />
            <TableComponent data={productsData} columns={['ProductID','IMAGE LINKS', 'Product Name', 'Description', 'Price', 'Category', 'Color', 'Size', 'PAYMENTLINK', 'DATE']} />
          </>
        );
    
      case 'orders':
        return (<>
        <OrdersTable />
        </>);
      default:
        return <FileUploadForm />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <nav className="w-full lg:w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveForm('files')} className={`block w-full text-left ${activeForm === 'files' && 'bg-gray-700'}`}>
              Files
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('colors')} className={`block w-full text-left ${activeForm === 'colors' && 'bg-gray-700'}`}>
              Colors
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('categories')} className={`block w-full text-left ${activeForm === 'categories' && 'bg-gray-700'}`}>
              Categories
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('sizes')} className={`block w-full text-left ${activeForm === 'sizes' && 'bg-gray-700'}`}>
              Sizes
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('products')} className={`block w-full text-left ${activeForm === 'products' && 'bg-gray-700'}`}>
              Products
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('laundry')} className={`block w-full text-left ${activeForm === 'laundry' && 'bg-gray-700'}`}>
              Laundry Services
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('orders')} className={`block w-full text-left ${activeForm === 'orders' && 'bg-gray-700'}`}>
              Orders
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {renderActiveForm()}
      </main>
    </div>
  );
};

// Component to render tables
const TableComponent = ({ data, columns }: { data: Record<string, unknown>[]; columns: string[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Existing Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {columns.map((col: string, index: number) => (
                <th key={index} className="py-2 px-4 border-b border-gray-300">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: Record<string, unknown>, index: number) => (
              <tr key={index}>
                {Object.values(item).map((val: unknown, idx: number) => (
                  <td key={idx} className="py-2 px-4 border-b border-gray-300">{String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
