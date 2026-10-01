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

const SalespersonHome = () => {
  axios.defaults.withCredentials = true;
  const [dashboard, setDashboard] = useState<any>(null);
  const [revenue, setRevenue] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const getSalespersonDashboard = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/salesperson/dashboard`,
        );
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

    const getSalespersonDashboardRevenue = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/salesperson/dashboard/revenue`,
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

    const getSalespersonTopProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/salesperson/dashboard/top-products",
        );

        setTopProducts(res.data.products || []);
        console.log(res.data.products, "aryan");
      } catch (err) {
        console.log(err);
      }
    };

    getSalespersonDashboard();
    getSalespersonDashboardRevenue();
    getSalespersonTopProducts();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: dashboard?.totalOrders || 0,
      icon: FiUsers,
      description: "Total orders placed by customers",
    },
    {
      title: "Products Sold",
      value: dashboard?.totalProductsSold || 0,
      icon: FiUserCheck,
      description: "Total products sold",
    },
    {
      title: "Revenue",
      value: dashboard?.totalRevenue || 0,
      icon: FiPackage,
      description: "Total revenue",
    },
    {
      title: "Current Stock",
      value: dashboard?.currentStock || 0,
      icon: FiShoppingBag,
      description: "Total products in stock",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-4xl">
          Salesperson Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Overview of your performance and activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards?.map((card) => {
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
        <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#222]">
            Top Selling Products
          </h2>

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
    </div>
  );
};

export default SalespersonHome;
