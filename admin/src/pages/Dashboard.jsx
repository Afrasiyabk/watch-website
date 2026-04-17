// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { FaChartLine, FaBox, FaShoppingCart, FaClock, FaMoneyBill } from 'react-icons/fa';
import { DashChartData, DashboardData } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`flex items-center gap-[15px]! p-[20px]! rounded-2xl shadow-sm ${color} text-white shadow-lg shadow-gray-700 w-[300px] ` }>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm font-bold uppercase">{title}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {

  const dispatch = useDispatch();

 const {
    usersCount,
    ordersCount,
    productsCount,
    activeOrdersCount,
    totalRevenue,
    recentOrders,
    ChartData
  } = useSelector(state => state.auth);
   const [filter, setFilter] = useState("day");

  useEffect(() => {
    dispatch(DashboardData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(DashChartData(filter));
  }, [dispatch,filter]);



  return (
    <div className="bg-gray-50 min-h-screen p-[40px]!">

      <h1 className="text-3xl font-black text-gray-800 mb-[30px]!">
        Admin Overview
      </h1>

      {/* ✅ STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[20px]! mb-[40px]!">
        <StatCard title="Users" value={usersCount} icon={<FaChartLine />} color="bg-green-500" />
        <StatCard title="Products" value={productsCount} icon={<FaBox />} color="bg-blue-500" />
        <StatCard title="Orders" value={ordersCount} icon={<FaShoppingCart />} color="bg-orange-500" />
        <StatCard title="Active Orders" value={activeOrdersCount} icon={<FaClock />} color="bg-[#00008B]" />
         <StatCard title="Total Revenue" value={totalRevenue|| '0'} icon={<FaMoneyBill />} color="bg-amber-400" />
      </div>

       {/* FILTER */}
      <div className="flex gap-3 mb-4!">
        <button className={`${filter==='day' ? 'bg-amber-400' : 'bg-gray-300 text-black'}  pl-7! pr-7! pt-3! pb-3! text-white rounded`} onClick={() => setFilter("day")}>Day</button>
        <button className={`${filter==='month' ? 'bg-red-400' : 'bg-gray-300 text-black'} pl-7! pr-7! pt-3! pb-3! text-white rounded`}  onClick={() => setFilter("month")}>Month</button>
        <button className={`${filter==='year' ? 'bg-green-400' : 'bg-gray-300 text-black'} pl-7! pr-7! pt-3! pb-3! text-white rounded`} onClick={() => setFilter("year")}>Year</button>
      </div>

    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">

  <h2 className="text-lg font-bold mb-4">Orders Analytics</h2>

  <ResponsiveContainer width="100%" height={320}>
    <LineChart
      data={ChartData}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="_id"
        tick={{ fontSize: 12 }}
      />

      <YAxis
        tick={{ fontSize: 12 }}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "orange",
          border: "none",
          borderRadius: "10px",
          color: "#fff"
        }}
      />

      <Line
        type="monotone"
        dataKey="totalOrders"
        stroke="blue"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="green"
        strokeWidth={3}
        dot={{ r: 4 }}
      />

    </LineChart>
  </ResponsiveContainer>

</div>

      {/* ✅ RECENT ORDERS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-[24px]! mt-10">
        <h2 className="text-xl font-bold mb-[20px]!">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b">
              <th className="pb-[10px]!">ORDER ID</th>
              <th className="pb-[10px]!">CUSTOMER</th>
              <th className="pb-[10px]!">STATUS</th>
              <th className="pb-[10px]!">TOTAL</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {recentOrders?.map((order) => (

              <tr key={order._id} className="border-b hover:bg-gray-50">

                <td className="py-[15px]! font-mono text-xs">
                  {order._id.slice(0, 8)}
                </td>

                <td className="py-[15px]!">
                  {order?.user?.fullName || "N/A"}
                </td>

                <td className="py-[15px]!">
                  <span
                    className={`px-[10px]! py-[4px]! rounded-full text-xs font-bold ${
                      order.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </td>

                {/* ✅ FIXED TOTAL */}
                <td className="py-[15px]! font-bold">
                  ${order.totalPrice}
                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;