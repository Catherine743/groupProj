import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
  const { products, sales } = useSelector((state) => state.stockReducer);
  const [sortType, setSortType] = useState("top5");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const totalRevenue = useMemo(() => sales.reduce((acc, sale) => acc + sale.totalAmount, 0), [sales]);

  const monthlyRevenue = useMemo(() => {
    return sales
      .filter(sale => {
        const d = new Date(sale.date);
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      })
      .reduce((acc, sale) => acc + sale.totalAmount, 0);
  }, [sales, selectedMonth, selectedYear]);

  const salesDataForMonth = useMemo(() => {
    const data = {};
    sales
      .filter(sale => {
        const d = new Date(sale.date);
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
      })
      .forEach(sale => {
        if (!data[sale.productId]) data[sale.productId] = { quantity: 0, revenue: 0 };
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
  }, [sales, products, selectedMonth, selectedYear]);

  const sortedData = useMemo(() => {
    const N = 5;
    let sorted = [...salesDataForMonth];

    if (sortType === "top5") sorted.sort((a, b) => b.quantity - a.quantity);
    else if (sortType === "bottom5") sorted.sort((a, b) => a.quantity - b.quantity);
    else if (sortType === "revenue") sorted.sort((a, b) => b.revenue - a.revenue);

    const topItems = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i < N) topItems.push(sorted[i]);
      else if (sortType === "top5" && sorted[i].quantity === sorted[N-1].quantity) topItems.push(sorted[i]);
      else if (sortType === "bottom5" && sorted[i].quantity === sorted[N-1].quantity) topItems.push(sorted[i]);
      else if (sortType === "revenue" && sorted[i].revenue === sorted[N-1].revenue) topItems.push(sorted[i]);
      else break;
    }
    return topItems;
  }, [salesDataForMonth, sortType]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];
  const mostSold = salesDataForMonth.sort((a,b)=>b.quantity-b.quantity)[0] || null;
  const leastSold = salesDataForMonth.sort((a,b)=>a.quantity-b.quantity)[0] || null;
  const profit = totalRevenue * 0.2;

  return (
    <div className="dashboard-card">
      <h2>📊 Smart Analytics Dashboard</h2>
      <p>Total Products: {products.length}</p>
      <p>Total Revenue: ₹{totalRevenue}</p>
      <p>Monthly Revenue ({selectedMonth+1}/{selectedYear}): ₹{monthlyRevenue}</p>
      <div>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={e=>setSelectedMonth(Number(e.target.value))}>
          {Array.from({length:12}).map((_,i)=><option key={i} value={i}>{new Date(0,i).toLocaleString('default',{month:'long'})}</option>)}
        </select>
        <input type="number" value={selectedYear} min="2000" max="2100" onChange={e=>setSelectedYear(Number(e.target.value))}/>
      </div>
      <p>Estimated Profit (20%): ₹{profit.toFixed(2)}</p>
      {mostSold && <p>📈 Most Sold: {mostSold.name} ({mostSold.quantity})</p>}
      {leastSold && <p>📦 Least Sold: {leastSold.name} ({leastSold.quantity})</p>}
      <hr/>
      <h3>🔎 Sort Products</h3>
      <select onChange={(e)=>setSortType(e.target.value)}>
        <option value="top5">Top 5 by Quantity</option>
        <option value="bottom5">Bottom 5 by Quantity</option>
        <option value="revenue">Top 5 by Revenue</option>
      </select>
      <hr/>
      <h3>📊 Sales Chart</h3>
      <BarChart width={500} height={300} data={sortedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" />
      </BarChart>
      <hr/>
      <h3>🥧 Revenue Distribution</h3>
      <PieChart width={500} height={350}>
        <Pie data={sortedData} dataKey="revenue" nameKey="name" outerRadius={120} label>
          {sortedData.map((entry,index)=><Cell key={index} fill={COLORS[index%COLORS.length]}/>)}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
}