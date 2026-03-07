import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {
  const { products, sales } = useSelector(state => state.stockReducer);
  const [sortType, setSortType] = useState("top5");

  // 📊 Total Revenue
  const totalRevenue = useMemo(() => {
    return sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  }, [sales]);

  // 📈 Monthly Revenue
  const currentMonth = new Date().getMonth();
  const monthlyRevenue = useMemo(() => {
    return sales
      .filter(sale => new Date(sale.date).getMonth() === currentMonth)
      .reduce((acc, sale) => acc + sale.totalAmount, 0);
  }, [sales]);

  // 📊 Sales Aggregation (Quantity + Revenue per product)
  const salesData = useMemo(() => {
    const data = {};

    sales.forEach(sale => {
      if (!data[sale.productId]) {
        data[sale.productId] = {
          quantity: 0,
          revenue: 0
        };
      }

      data[sale.productId].quantity += sale.quantity;
      data[sale.productId].revenue += sale.totalAmount;
    });

    return Object.keys(data).map(id => {
      const product = products.find(p => p.id === Number(id));
      return {
        name: product?.name || "Unknown",
        quantity: data[id].quantity,
        revenue: data[id].revenue
      };
    });
  }, [sales, products]);

  // 🔥 Sorting Logic
  const sortedData = useMemo(() => {
    let sorted = [...salesData];

    if (sortType === "top5") {
      return sorted.sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    }

    if (sortType === "bottom5") {
      return sorted.sort((a, b) => a.quantity - b.quantity).slice(0, 5);
    }

    if (sortType === "revenue") {
      return sorted.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    }

    return sorted;
  }, [salesData, sortType]);

  // 📈 Most Sold Product
  const mostSold =
    salesData.length > 0
      ? [...salesData].sort((a, b) => b.quantity - a.quantity)[0]
      : null;

  // 📦 Least Sold Product
  const leastSold =
    salesData.length > 0
      ? [...salesData].sort((a, b) => a.quantity - b.quantity)[0]
      : null;

  // 💰 Profit (20%)
  const profit = totalRevenue * 0.2;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="dashboard-card">
      <h2>📊 Smart Analytics Dashboard</h2>

      <p>Total Products: {products.length}</p>
      <p>Total Revenue: ₹{totalRevenue}</p>
      <p>Monthly Revenue: ₹{monthlyRevenue}</p>
      <p>Estimated Profit (20%): ₹{profit.toFixed(2)}</p>

      {mostSold && (
        <p>📈 Most Sold: {mostSold.name} ({mostSold.quantity} sold)</p>
      )}

      {leastSold && (
        <p>📦 Least Sold: {leastSold.name} ({leastSold.quantity} sold)</p>
      )}

      <hr />

      <h3>🔎 Sort Products</h3>

      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="top5">Top 5 by Quantity</option>
        <option value="bottom5">Bottom 5 by Quantity</option>
        <option value="revenue">Top 5 by Revenue</option>
      </select>

      <hr />

      <h3>📊 Sales Chart</h3>

      <BarChart width={500} height={300} data={sortedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" />
      </BarChart>

      <hr />

      <h3>🥧 Revenue Distribution</h3>

      <PieChart width={500} height={350}>
        <Pie
          data={sortedData}
          dataKey="revenue"
          nameKey="name"
          outerRadius={120}
          label
        >
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
}