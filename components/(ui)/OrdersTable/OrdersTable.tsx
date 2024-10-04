// "use client";

// import { useEffect, useState } from "react";

// const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const OrdersTable = () => {
//   const [orders, setOrders] = useState<any[]>([]); // Ensure orders is an array

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/order`);
//         const data = await response.json();
//         console.log("Fetched Orders:", data); // Debugging: Log the fetched orders

//         // Check if data is an array
//         if (Array.isArray(data)) {
//           setOrders(data);
//         } else {
//           console.error("Unexpected response format:", data);
//           setOrders([]); // Set to empty array if data isn't an array
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setOrders([]); // Set to empty array in case of error
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="mt-8">
//       <h2 className="text-4xl mb-8 mx-auto text-center">سفارشات شما از مجموعه لوسی من</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b border-gray-300">نام محصول</th>
//               <th className="py-2 px-4 border-b border-gray-300">تاریخ سفارش</th>
//               <th className="py-2 px-4 border-b border-gray-300">وضعیت سفارش</th>
//               <th className="py-2 px-4 border-b border-gray-300">هزینه</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order: any) => (
//                 <tr key={order._id}>
//                   <td className="py-2 px-4 border-b border-gray-300">{order.productTitle}</td>
//                   <td className="py-2 px-4 border-b border-gray-300">
//                     {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-300">{order.status || "N/A"}</td>
//                   <td className="py-2 px-4 border-b border-gray-300">تومان {order.productPrice || "N/A"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="py-4 text-center">No orders found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrdersTable;


const OrdersTable = () => {
  return (
    <div className="text-center text-3xl">
      یک مشکل کوچیک داریم سریع اوکی میشهه....
    </div>
  )
}

export default OrdersTable

