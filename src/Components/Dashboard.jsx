import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
  const { products, sales } = useSelector(state => state.stockReducer);
  const [sortType, setSortType] = useState("top5");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const totalRevenue = useMemo(
    () => sales.reduce((acc, s) => acc + s.totalAmount, 0),
    [sales]
  );

  const salesDataForMonth = useMemo(() => {
    const data = {};
    sales.forEach(sale => {
      const d = new Date(sale.date);
      if (d.getMonth() === selectedMonth && d.getFullYear() === selectedYear) {
        if (!data[sale.productId]) data[sale.productId] = { quantity: 0, revenue: 0 };
        data[sale.productId].quantity += sale.quantity;
        data[sale.productId].revenue += sale.totalAmount;
      }
    });

    return Object.entries(data).map(([id, val]) => {
      const product = products.find(p => p.id === Number(id));
      return { name: product?.name || "Unknown", ...val };
    });
  }, [sales, products, selectedMonth, selectedYear]);

  const { sortedData, mostSold, leastSold, monthlyRevenue } = useMemo(() => {
    if (!salesDataForMonth.length) return { sortedData: [], mostSold: null, leastSold: null, monthlyRevenue: 0 };

    const monthlyRevenue = salesDataForMonth.reduce((acc, s) => acc + s.revenue, 0);

    // Determine top/bottom/revenue sort
    const sorted = [...salesDataForMonth];
    if (sortType === "top5") sorted.sort((a, b) => b.quantity - a.quantity);
    else if (sortType === "bottom5") sorted.sort((a, b) => a.quantity - b.quantity);
    else if (sortType === "revenue") sorted.sort((a, b) => b.revenue - a.revenue);

    const N = 5;
    const topItems = sorted.filter((item, idx) => {
      if (idx < N) return true;
      if (sortType === "revenue") return item.revenue === sorted[N - 1].revenue;
      return item.quantity === sorted[N - 1].quantity;
    });

    // Most/least sold
    const mostSold = salesDataForMonth.reduce((max, curr) => (curr.quantity > max.quantity ? curr : max), salesDataForMonth[0]);
    const leastSold = salesDataForMonth.reduce((min, curr) => (curr.quantity < min.quantity ? curr : min), salesDataForMonth[0]);

    return { sortedData: topItems, mostSold, leastSold, monthlyRevenue };
  }, [salesDataForMonth, sortType]);

  const profit = totalRevenue * 0.2;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="dashboard-card">
      <h2>📊 Smart Analytics Dashboard</h2>
      <p>Total Products: {products.length}</p>
      <p>Total Revenue: ₹{totalRevenue}</p>
      <p>Monthly Revenue ({selectedMonth + 1}/{selectedYear}): ₹{monthlyRevenue}</p>
      <p>Estimated Profit (20%): ₹{profit.toFixed(2)}</p>
      {mostSold && <p>📈 Most Sold: {mostSold.name} ({mostSold.quantity})</p>}
      {leastSold && <p>📦 Least Sold: {leastSold.name} ({leastSold.quantity})</p>}

      <hr />
      <h3>🔎 Sort Products</h3>
      <select value={sortType} onChange={e => setSortType(e.target.value)}>
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
        <Bar dataKey="quantity" fill="#4a6cf7" />
      </BarChart>

      <hr />
      <h3>🥧 Revenue Distribution</h3>
      <PieChart width={500} height={350}>
        <Pie data={sortedData} dataKey="revenue" nameKey="name" outerRadius={120} label>
          {sortedData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
}