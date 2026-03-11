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

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Total Revenue (All Time)
  const totalRevenue = useMemo(() =>
    sales.reduce((sum, s) => sum + s.totalAmount, 0),
    [sales]
  );

  // Filter sales of selected month
  const monthlySales = useMemo(() => {
    return sales.filter(sale => {
      const d = new Date(sale.date);

      return (
        d.getMonth() === selectedMonth &&
        d.getFullYear() === selectedYear
      );
    });
  }, [sales, selectedMonth, selectedYear]);



  // Monthly Revenue
  const monthlyRevenue = useMemo(() => {
    return monthlySales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );
  }, [monthlySales]);



  // Product wise monthly data
  const salesDataForMonth = useMemo(() => {

    const data = {};

    monthlySales.forEach(sale => {

      if (!data[sale.productId]) {
        data[sale.productId] = { quantity: 0, revenue: 0 };
      }

      data[sale.productId].quantity += sale.quantity;
      data[sale.productId].revenue += sale.totalAmount;

    });

    return Object.entries(data)
      .map(([id, val]) => {

        const product = products.find(p => p.id === Number(id));

        if (!product) return null;

        return {
          name: product.name,
          quantity: val.quantity,
          revenue: val.revenue
        };

      })
      .filter(Boolean);

  }, [monthlySales, products]);


  // Sorting + Most/Least sold
  const { sortedData, mostSold, leastSold } = useMemo(() => {

    if (!salesDataForMonth.length)
      return {
        sortedData: [],
        mostSold: null,
        leastSold: null
      };

    const sorted = [...salesDataForMonth];

    if (sortType === "top5") {
      sorted.sort((a, b) => b.quantity - a.quantity);
    }
    else if (sortType === "bottom5") {
      sorted.sort((a, b) => a.quantity - b.quantity);
    }
    else if (sortType === "revenue") {
      sorted.sort((a, b) => b.revenue - a.revenue);
    }

    const sortedData = sorted.slice(0, 5);

    const mostSold = salesDataForMonth.reduce((max, curr) =>
      curr.quantity > max.quantity ? curr : max
    );

    const leastSold = salesDataForMonth.reduce((min, curr) =>
      curr.quantity < min.quantity ? curr : min
    );

    return {
      sortedData,
      mostSold,
      leastSold
    };

  }, [salesDataForMonth, sortType]);


  // Profit (20%)
  const profit = monthlyRevenue * 0.2;



  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A"
  ];

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = [2023, 2024, 2025, 2026];



  return (

    <div className="dashboard-card">

      <h2>Smart Analytics Dashboard</h2>

      <div className="dashboard-stats">
        <p><span className="stat">Total Products:</span> {products.length}</p>
  
        <p><span className="stat">Total Revenue:</span> ₹{totalRevenue}</p>
  
        <p>
          <span className="stat">Monthly Revenue ({selectedMonth + 1}/{selectedYear}):</span> ₹{monthlyRevenue}
        </p>
  
        <p><span className="stat">Estimated Profit (20%):</span> ₹{profit.toFixed(2)}</p>
  
        {mostSold && (
          <p><span className="stat">Most Sold:</span> {mostSold.name} ({mostSold.quantity})</p>
        )}
  
        {leastSold && (
          <p><span className="stat">Least Sold: </span>{leastSold.name} ({leastSold.quantity})</p>
        )}
      </div>

      <hr />

      <h3> Select Month & Year</h3>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>

        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((m, index) => (
            <option key={index} value={index}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

      </div>

      <hr />

      <h3> Sort Products</h3>

      <select
        value={sortType}
        onChange={e => setSortType(e.target.value)}
      >
        <option value="top5">Top 5 by Quantity</option>
        <option value="bottom5">Bottom 5 by Quantity</option>
        <option value="revenue">Top 5 by Revenue</option>
      </select>

      <hr />

      <h3> Sales Chart</h3>

      {salesDataForMonth.length > 0 ?<BarChart
        width={500}
        height={300}
        data={sortedData}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey={sortType === "revenue" ? "revenue" : "quantity"}
          fill="#4a6cf7"
        />

      </BarChart>: <p className="">No sales data available.</p>}
      

      <hr />

      <h3> Revenue Distribution</h3>

      { salesDataForMonth.length > 0?<PieChart width={500} height={350}>

        <Pie
          data={sortedData}
          dataKey="revenue"
          nameKey="name"
          outerRadius={120}
          label
        >

          {sortedData.map((entry,index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}

        </Pie>

        <Legend />

        <Tooltip />

      </PieChart>: <p className="">No sales data available.</p>}

    </div>
  );
}