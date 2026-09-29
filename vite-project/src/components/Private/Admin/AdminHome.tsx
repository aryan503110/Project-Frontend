import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiUserCheck,
  FiPackage,
  FiShoppingBag,
  FiClipboard,
  FiBox,
  FiTrendingUp,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const AdminHome = () => {
  axios.defaults.withCredentials = true;
  const [dashboard, setDashboard] = useState<any>(null);
  const [revenue, setRevenue] = useState<any[]>([]);
  const [orderStatus, setOrderStatus] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const getAdminDashboard = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/dashboard`);
        setDashboard(res.data.dashboard);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    const getAdminDashboardRevenue = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/admin/dashboard/revenue`,
        );
        setRevenue(res.data.revenue);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    const getOrderStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/dashboard/order-status",
          {
            withCredentials: true,
          },
        );

        setOrderStatus(res.data.orderStatus || []);
      } catch (err) {
        console.log(err);
      }
    };

    const getTopProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/dashboard/top-products",
          {
            withCredentials: true,
          },
        );

        setTopProducts(res.data.products || []);
      } catch (err) {
        console.log(err);
      }
    };

    getAdminDashboard();
    getAdminDashboardRevenue();
    getOrderStatus();
    getTopProducts();
  }, []);

  const cards = [
    {
      title: "Total Customers",
      value: dashboard?.totalCustomers || 0,
      icon: FiUsers,
      description: "Registered customers",
    },
    {
      title: "Salespersons",
      value: dashboard?.totalSalespersons || 0,
      icon: FiUserCheck,
      description: "Active salespersons",
    },
    {
      title: "Products",
      value: dashboard?.totalProducts || 0,
      icon: FiPackage,
      description: "Total products",
    },
    {
      title: "Orders",
      value: dashboard?.totalOrders || 0,
      icon: FiShoppingBag,
      description: "Total orders",
    },
    {
      title: "Stock Requests",
      value: dashboard?.totalStockRequests || 0,
      icon: FiClipboard,
      description: "Stock requests",
    },
    {
      title: "Admin Stock",
      value: dashboard?.totalAdminStock || 0,
      icon: FiBox,
      description: "Stock records",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Overview of your store performance and activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#222]">
                    {card.value}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    {card.description}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4a853]/10 text-[#d4a853] transition group-hover:bg-[#d4a853] group-hover:text-black">
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Card */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-[#222] shadow-lg">
        <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a853]/15 text-[#d4a853]">
                <FiTrendingUp size={20} />
              </div>

              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
            </div>

            <h2 className="text-4xl font-bold text-white">
              ₹{dashboard?.totalRevenue || 0}
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Revenue from completed payments
            </p>
          </div>

          <div className="rounded-xl border border-[#d4a853]/20 bg-[#d4a853]/10 px-5 py-4">
            <p className="text-xs text-gray-400">Payment Status</p>

            <p className="mt-1 text-sm font-semibold text-[#d4a853]">
              Paid Orders
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 lg:flex-row">
        <div className="mt-6 w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#222]">Monthly Revenue</h2>

          <p className="mt-1 text-sm text-gray-500">
            Revenue generated from paid orders
          </p>

          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="_id.month"
                  tickFormatter={(month) => `Month ${month}`}
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#d4a853"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#222]">Order Status</h2>

          <p className="mt-1 text-sm text-gray-500">
            Overview of your order statuses
          </p>

          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  dataKey="totalOrders"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  label
                >
                  {orderStatus.map((item, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-[#222]">Top Selling Products</h2>

        <p className="mt-1 text-sm text-gray-500">
          Top 5 products based on quantity sold
        </p>

        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis type="category" dataKey="productName" width={120} />

              <Tooltip />

              <Bar
                dataKey="totalQuantity"
                fill="#d4a853"
                radius={[0, 6, 6, 0]}
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
