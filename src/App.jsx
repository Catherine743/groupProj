import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import AddSale from "./Components/AddSale";
import Dashboard from "./Components/Dashboard";
import EditProduct from "./Components/EditProduct";
import ViewProducts from "./Components/ViewProducts";
import Sidebar from "./Components/SideBar";
import Login from "./Components/Login";

function App() {
  return (
    <Routes>

      {/* Login Page (No Sidebar) */}
      <Route path="/login" element={<Login />} />

      {/* Pages with Sidebar */}
      <Route
        path="/*"
        element={
          <div className="layout">

            <Sidebar />

            <div className="main-content">
              <Routes>
                <Route path="/" element={<ViewProducts />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/addsale" element={<AddSale />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>

          </div>
        }
      />

    </Routes>
  );
}

export default App;
