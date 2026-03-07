import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import LandingPage from "./Components/LandingPage";
import ViewProducts from "./Components/ViewProducts";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import AddSale from "./Components/AddSale";
import Dashboard from "./Components/Dashboard";

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  return (
    <div className="layout">
      {!hideSidebar && <Sidebar />}
      <div className={hideSidebar ? "landing-main" : "main-content"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/addsale" element={<AddSale />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;